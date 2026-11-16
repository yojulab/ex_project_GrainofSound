#!/usr/bin/env bash
# ==============================================================================
# 비영리 전통연희단체 「연희단 결 (GYEOL : The Grain of Sound)」 — 통합 관리 스크립트 (run_port.sh)
#
# [특징]
#   • 올인원(All-in-One) 통합 매니저: 컴파일, 빌드, 기동, 중지, 재시작, 시드, 상태 점검 단일화
#   • Any Host 바인딩: 0.0.0.0 바인딩으로 외부 도메인(https://neptune.axfoundly.com) 및 어디서든 접속 가능
#   • Any Port 지원: 기본 포트(30030) 외에 임의의 포트(Any Port) 지정 실행 지원
#   • 운영(prod) / 개발(dev) / 디버그(debug, 인스펙터 30031) 모드 완벽 지원
#   • MongoDB (grain_of_sound) 연결 상태 자동 점검 및 TypeScript 타입 검사/클린 빌드 내장
#
# [사용법 요약]
#   [서버 기동/중지/상태]
#     ./run_port.sh start [PORT]            : 운영(prod) 모드 기동 (사전 빌드 없으면 자동 빌드, 기본 30030)
#     ./run_port.sh prod [PORT]             : 운영(prod) 모드 기동
#     ./run_port.sh dev [PORT]              : 개발(dev) 모드 기동 (기본 30030)
#     ./run_port.sh debug [PORT]            : 디버그 모드 (Node 인스펙터 30031)
#     ./run_port.sh [PORT]                  : 숫자 포트만 입력 시 운영 모드로 즉시 기동 (예: ./run_port.sh 30030)
#     ./run_port.sh stop [PORT]             : 프로세스 중지
#     ./run_port.sh restart [dev|prod] [PORT]: 서비스 재시작
#     ./run_port.sh status [PORT]           : 포트 및 서비스 상태 확인
#
#   [컴파일/빌드/검사/DB]
#     ./run_port.sh compile                 : 전체 컴파일/빌드 (npm run build)
#     ./run_port.sh build                   : 동일 (Next.js 빌드)
#     ./run_port.sh tsc                     : TypeScript 정적 타입 검증 (npx tsc --noEmit)
#     ./run_port.sh clean                   : 빌드 캐시(.next, tsbuildinfo, server.log) 정리
#     ./run_port.sh clean-build             : 캐시 정리 후 전체 클린 재컴파일
#     ./run_port.sh check                   : 타입 검증 후 전체 컴파일 수행
#     ./run_port.sh seed                    : grain_of_sound DB 초기 데이터 시딩 (npm run seed)
#     ./run_port.sh help                    : 도움말 출력
# ==============================================================================

# source(.)로 호출되었을 때 터미널 강제 종료 방지
(return 0 2>/dev/null) && _RUN_PORT_SOURCED=1 || _RUN_PORT_SOURCED=0

safe_exit() {
  local code=${1:-0}
  if [ "$_RUN_PORT_SOURCED" -eq 1 ]; then
    return "$code" 2>/dev/null || true
  else
    exit "$code"
  fi
}

if [ "$_RUN_PORT_SOURCED" -eq 0 ]; then
  set -uo pipefail
fi

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# .env에서 PORT 및 PUBLIC URL 읽기 (하드코딩 폴백 대신 .env 우선 참조, 기본 포트 30030)
ENV_FILE="${PROJECT_DIR}/.env"
ENV_PORT=""
ENV_APP_URL=""
if [ -f "$ENV_FILE" ]; then
  ENV_PORT=$(grep -E '^[[:space:]]*PORT=' "$ENV_FILE" | head -n 1 | cut -d '=' -f2- | tr -d '"' | tr -d "'" | tr -d '\r' || true)
  ENV_APP_URL=$(grep -E '^[[:space:]]*NEXT_PUBLIC_APP_URL=' "$ENV_FILE" | head -n 1 | cut -d '=' -f2- | tr -d '"' | tr -d "'" | tr -d '\r' || true)
fi

DEFAULT_PORT="${PORT:-${ENV_PORT:-30030}}"
DEFAULT_HOST="0.0.0.0"
INSPECT_PORT="${INSPECT_PORT:-30031}"
PUBLIC_DOMAIN="${ENV_APP_URL:-https://neptune.axfoundly.com}"
LOG_FILE="${PROJECT_DIR}/server.log"

# 터미널 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m'

# 의존성 모듈 설치 확인
ensure_dependencies() {
  if [ ! -d "${PROJECT_DIR}/node_modules" ]; then
    echo -e "${YELLOW}⚠️ node_modules 미설치 감지 → npm install 진행...${NC}"
    (cd "${PROJECT_DIR}" && npm install) || {
      echo -e "${RED}✗ 의존성 패키지 설치에 실패했습니다.${NC}"
      return 1
    }
  fi
  return 0
}

# 소켓 연결 확인 헬퍼 (Python 원라이너)
check_socket_open() {
  local host="${1:-127.0.0.1}"
  local p="$2"
  python3 -c "import socket; s = socket.socket(); s.settimeout(0.5); s.connect(('${host}', ${p})); s.close()" 2>/dev/null
}

is_port_in_use() {
  local p=$1
  local host="${2:-127.0.0.1}"
  if check_socket_open "$host" "$p"; then
    return 0
  fi
  if [ "$host" = "127.0.0.1" ]; then
    python3 -c "import socket; s = socket.socket(socket.AF_INET6, socket.SOCK_STREAM); s.settimeout(0.5); s.connect(('::1', ${p})); s.close()" 2>/dev/null
    return $?
  fi
  return 1
}

filter_safe_pids() {
  local raw_pids="$1"
  [ -z "$raw_pids" ] && return 0

  # PID 1 및 현재 쉘/스크립트의 모든 조상 프로세스는 절대 kill 대상에서 제외
  local protected=" 1 $$ $PPID "
  local cur="$$"
  local hops=0
  while [ "$hops" -lt 20 ]; do
    local parent
    parent=$(ps -o ppid= -p "$cur" 2>/dev/null | tr -d ' ' || true)
    if [ -z "$parent" ] || [ "$parent" = "0" ] || [ "$parent" = "$cur" ]; then
      break
    fi
    protected="${protected}${parent} "
    cur="$parent"
    hops=$((hops + 1))
  done

  local safe=""
  for pid in $raw_pids; do
    if [[ "$pid" =~ ^[0-9]+$ ]]; then
      if [[ "$protected" != *" ${pid} "* ]]; then
        if [[ " ${safe} " != *" ${pid} "* ]]; then
          safe="${safe:+${safe} }${pid}"
        fi
      fi
    fi
  done
  echo "$safe"
}

get_pids() {
  local p=${1:-$DEFAULT_PORT}
  local pid_file="/tmp/gyeol_${p}.pid"
  local raw=""

  # 1. 커널 소켓 테이블(/proc/net/tcp, tcp6) LISTEN inode 직접 스캔 (IPv4/IPv6 통합, 컨테이너 환경 100% 정확)
  raw=$(python3 -c "
import glob, os
port_hex = f'{int(${p}):04X}'
inodes = set()
for path in ('/proc/net/tcp', '/proc/net/tcp6'):
    if not os.path.exists(path):
        continue
    try:
        with open(path) as f:
            next(f, None)
            for line in f:
                cols = line.split()
                if len(cols) >= 10 and cols[3] == '0A' and cols[1].split(':')[-1] == port_hex:
                    inodes.add(f'socket:[{cols[9]}]')
    except OSError:
        pass
if inodes:
    found = set()
    for fd in glob.glob('/proc/[0-9]*/fd/*'):
        try:
            if os.readlink(fd) in inodes:
                found.add(fd.split('/')[2])
        except OSError:
            pass
    print(' '.join(sorted(found)))
" 2>/dev/null || true)

  # 2. fuser / lsof 보조 탐지
  if [ -z "$raw" ] && command -v fuser >/dev/null 2>&1; then
    raw=$(fuser "${p}/tcp" 2>/dev/null | tr -s ' ' '\n' | grep -E '^[0-9]+$' | tr '\n' ' ' || true)
  fi
  if [ -z "$raw" ] && command -v lsof >/dev/null 2>&1; then
    raw=$(lsof -tiTCP:"${p}" -sTCP:LISTEN 2>/dev/null | tr '\n' ' ' || true)
  fi

  # 3. PID 파일 및 그 자식 프로세스 보조 확인
  if [ -z "$raw" ] && [ -f "$pid_file" ]; then
    local saved_pid
    saved_pid=$(cat "$pid_file" 2>/dev/null | tr -d '[:space:]' || true)
    if [[ "$saved_pid" =~ ^[0-9]+$ ]] && kill -0 "$saved_pid" 2>/dev/null; then
      local cmdline
      cmdline=$(ps -o args= -p "$saved_pid" 2>/dev/null || true)
      if [[ "$cmdline" == *"next"* ]] || [[ "$cmdline" == *"node"* ]]; then
        local child_pids
        child_pids=$(pgrep -P "$saved_pid" 2>/dev/null | tr '\n' ' ' || true)
        raw="${saved_pid} ${child_pids}"
      fi
    fi
  fi

  filter_safe_pids "$raw"
}

# ------------------------------------------------------------------------------
# 1. 컴파일 & 빌드 서브루틴
# ------------------------------------------------------------------------------
cmd_compile() {
  echo -e "\n${CYAN}=================================================================${NC}"
  echo -e " 🥁 ${BOLD}연희단 결 (GYEOL : The Grain of Sound) 프로덕션 빌드 시작 (npm run build)${NC}"
  echo -e "${CYAN}=================================================================${NC}"

  ensure_dependencies || return 1

  local start_time=$(date +%s)
  if (cd "${PROJECT_DIR}" && npm run build); then
    local end_time=$(date +%s)
    local elapsed=$((end_time - start_time))
    local build_id=$(cat "${PROJECT_DIR}/.next/BUILD_ID" 2>/dev/null || echo "ok")
    echo -e "${GREEN}✓ Next.js 빌드 성공! (BUILD_ID: ${build_id}, 소요 시간: ${elapsed}초)${NC}\n"
    return 0
  else
    echo -e "${RED}✗ Next.js 빌드 실패! 로그를 확인해 주십시오.${NC}\n"
    return 1
  fi
}

cmd_typecheck() {
  echo -e "\n${CYAN}=================================================================${NC}"
  echo -e " 🛡️ ${BOLD}TypeScript 정적 타입 검증 (npx tsc --noEmit)${NC}"
  echo -e "${CYAN}=================================================================${NC}"

  if (cd "${PROJECT_DIR}" && npx tsc --noEmit); then
    echo -e "${GREEN}✓ TypeScript 타입 검증 통과 (에러 0건)${NC}\n"
    return 0
  else
    echo -e "${RED}✗ TypeScript 타입 에러가 감지되었습니다.${NC}\n"
    return 1
  fi
}

cmd_clean() {
  echo -e "\n${YELLOW}🧹 빌드 캐시 및 임시 파일 정리 중...${NC}"
  rm -rf "${PROJECT_DIR}/.next"
  rm -f "${PROJECT_DIR}/tsconfig.tsbuildinfo"
  rm -f "${PROJECT_DIR}/server.log"
  echo -e "${GREEN}✓ .next 및 tsbuildinfo 캐시가 깨끗이 정리되었습니다.${NC}\n"
}

cmd_seed() {
  echo -e "\n${CYAN}=================================================================${NC}"
  echo -e " 🌱 ${BOLD}MongoDB (grain_of_sound) 초기 데이터 시딩 실행${NC}"
  echo -e "${CYAN}=================================================================${NC}"
  ensure_dependencies || return 1
  (cd "${PROJECT_DIR}" && npm run seed)
}

# ------------------------------------------------------------------------------
# 2. 프로세스 제어 (중지 / 기동 / 상태)
# ------------------------------------------------------------------------------
cmd_stop() {
  local p=${1:-$DEFAULT_PORT}
  local pid_file="/tmp/gyeol_${p}.pid"
  echo -n -e "🛑 [:${p}] 프로세스 중지 중... "
  local pids
  pids=$(get_pids "$p")
  if [ -n "$pids" ]; then
    kill -15 $pids 2>/dev/null || true
    for _ in 1 2 3 4 5; do
      if ! is_port_in_use "$p" && [ -z "$(get_pids "$p")" ]; then
        break
      fi
      sleep 1
    done
    local remain
    remain=$(get_pids "$p")
    if [ -n "$remain" ]; then
      kill -9 $remain 2>/dev/null || true
      sleep 1
    fi
    rm -f "$pid_file"
    echo -e "${YELLOW}종료 완료 (PID: ${pids})${NC}"
  else
    rm -f "$pid_file"
    echo -e "${NC}실행 중인 프로세스 없음${NC}"
  fi
}

cmd_start() {
  local mode=${1:-prod}
  local p=${2:-$DEFAULT_PORT}
  cmd_stop "$p" >/dev/null 2>&1

  # 포트가 여전히 점유 중이면 오탐지 방지를 위해 즉시 차단
  if is_port_in_use "$p"; then
    local blocking_pids
    blocking_pids=$(get_pids "$p")
    echo -e "${RED}✗ [:${p}] 포트가 여전히 사용 중입니다 (점유 PID: ${blocking_pids:-외부/권한없음}). 기동을 중단합니다.${NC}"
    return 1
  fi

  echo -e "🥁 [:${p}] 연희단 결 (GYEOL : The Grain of Sound) 공식 웹페이지 기동 중 (${mode} 모드, Host: ${DEFAULT_HOST})..."

  # MongoDB (grain_of_sound) 상태 점검 및 연결
  local db_uri=""
  if [ -f "$ENV_FILE" ]; then
    db_uri=$(grep -E '^[[:space:]]*MONGODB_URI=' "$ENV_FILE" | head -n 1 | cut -d '=' -f2- | tr -d '"' | tr -d "'" | tr -d '\r')
  fi

  local db_host="127.0.0.1"
  local db_port="27017"
  local db_name="grain_of_sound"
  if [ -n "$db_uri" ]; then
    local ext_host=$(echo "$db_uri" | sed -E 's|^mongodb://([^/@]+@)?([^:/@]+)(:([0-9]+))?.*|\2|')
    local ext_port=$(echo "$db_uri" | sed -E 's|^mongodb://([^/@]+@)?([^:/@]+)(:([0-9]+))?.*|\4|')
    local ext_db=$(echo "$db_uri" | sed -E 's|^mongodb://[^/]+/([^?]+).*|\1|')
    [ -n "$ext_host" ] && db_host="$ext_host"
    [ -n "$ext_port" ] && db_port="$ext_port"
    [ -n "$ext_db" ] && db_name="$ext_db"
  fi

  local gw_hex=$(awk '$2 == "00000000" {print $3}' /proc/net/route 2>/dev/null | head -n 1)
  local docker_gw=""
  if [ -n "$gw_hex" ] && [ ${#gw_hex} -eq 8 ]; then
    docker_gw=$(printf "%d.%d.%d.%d" "0x${gw_hex:6:2}" "0x${gw_hex:4:2}" "0x${gw_hex:2:2}" "0x${gw_hex:0:2}")
  fi

  local db_reachable=0
  if check_socket_open "$db_host" "$db_port"; then
    db_reachable=1
  elif [ -n "$docker_gw" ] && { [ "$db_host" = "127.0.0.1" ] || [ "$db_host" = "localhost" ]; }; then
    if check_socket_open "$docker_gw" "$db_port"; then
      db_reachable=1
      echo -e "   ${GREEN}✓ Docker 호스트 MongoDB 감지됨 (Host: ${docker_gw}:${db_port}, DB: ${db_name})${NC}"
    fi
  fi

  if [ "$db_reachable" -eq 0 ]; then
    if command -v mongod >/dev/null 2>&1; then
      echo -e "   ${YELLOW}⚡ MongoDB (${db_host}:${db_port}, DB: ${db_name}) 미가동 감지. 데몬 자동 기동 중...${NC}"
      mkdir -p /root/data/db
      mongod --dbpath /root/data/db --fork --logpath /root/data/mongod.log --bind_ip 127.0.0.1 >/dev/null 2>&1 || true
      sleep 1
    else
      echo -e "   ${YELLOW}⚠️ MongoDB (${db_host}:${db_port}, DB: ${db_name}) 미연결 (외부/Docker MongoDB 확인 필요)${NC}"
    fi
  else
    echo -e "   ${GREEN}✓ MongoDB (${db_host}:${db_port} / DB: ${db_name}) 연결 확인 완료${NC}"
  fi

  local next_bin="${PROJECT_DIR}/node_modules/.bin/next"
  if [ ! -x "$next_bin" ]; then
    next_bin="npx next"
  fi

  local pid_file="/tmp/gyeol_${p}.pid"
  if [ "$mode" = "debug" ]; then
    (cd "${PROJECT_DIR}" && nohup env PORT="$p" HOSTNAME="$DEFAULT_HOST" NODE_OPTIONS="--inspect=0.0.0.0:${INSPECT_PORT}" $next_bin dev -H "$DEFAULT_HOST" -p "$p" > "$LOG_FILE" 2>&1 & echo $! > "$pid_file")
  elif [ "$mode" = "dev" ]; then
    (cd "${PROJECT_DIR}" && nohup env PORT="$p" HOSTNAME="$DEFAULT_HOST" $next_bin dev -H "$DEFAULT_HOST" -p "$p" > "$LOG_FILE" 2>&1 & echo $! > "$pid_file")
  else
    # prod (운영 모드)
    if [ ! -f "${PROJECT_DIR}/.next/BUILD_ID" ]; then
      echo -e "   ${YELLOW}📦 프로덕션 빌드 부재 감지. 빌드 자동 수행 중...${NC}"
      cmd_compile || return 1
    fi
    (cd "${PROJECT_DIR}" && nohup env PORT="$p" HOSTNAME="$DEFAULT_HOST" $next_bin start -H "$DEFAULT_HOST" -p "$p" > "$LOG_FILE" 2>&1 & echo $! > "$pid_file")
  fi

  local new_pid
  new_pid=$(cat "$pid_file" 2>/dev/null | tr -d '[:space:]' || true)

  for i in {1..10}; do
    if [ -n "$new_pid" ] && ! kill -0 "$new_pid" 2>/dev/null && ! is_port_in_use "$p"; then
      echo -e "${RED}✗ [:${p}] 서버 프로세스가 기동 중 종료되었습니다. 로그를 확인하세요:${NC}"
      tail -n 20 "$LOG_FILE" 2>/dev/null || true
      return 1
    fi
    if is_port_in_use "$p"; then
      echo -e "   ${GREEN}✓ [:${p}] ONLINE 기동 성공 (Local: http://localhost:${p} / Domain: ${PUBLIC_DOMAIN})${NC}"
      echo -e "   ${CYAN}🌐 Any Host / Any Port 접속 지원: ${DEFAULT_HOST}:${p} 바인딩 완료${NC}"
      if [ "$mode" = "debug" ]; then
        echo -e "   ${CYAN}🔍 Node Debugger Inspector: ws://localhost:${INSPECT_PORT}${NC}"
      fi
      return 0
    fi
    sleep 1
  done

  echo -e "   ${YELLOW}⏳ 초기화 진행 중 (상태 확인: ./run_port.sh status ${p})${NC}"
}

cmd_status() {
  local p=${1:-$DEFAULT_PORT}
  echo -e "${CYAN}=================================================================${NC}"
  echo -e "${CYAN} 🥁 연희단 결 (GYEOL : The Grain of Sound) 서비스 상태 점검 (Port ${p})${NC}"
  echo -e "${CYAN}=================================================================${NC}"

  if is_port_in_use "$p"; then
    local pids
    pids=$(get_pids "$p")
    echo -e "  • [:${p}] 연희단 결 (GYEOL) 웹페이지 : ${GREEN}ONLINE${NC} (PID: ${pids:-확인중}) ✓"
    echo -e "  • 공식 도메인: ${BOLD}${PUBLIC_DOMAIN}${NC}"
    echo -e "  • 로컬 URL   : ${BOLD}http://localhost:${p}${NC} (외부: http://<서버IP>:${p})"
    echo -e "  • 바인딩 호스트: ${BOLD}${DEFAULT_HOST} (모든 네트워크 인터페이스 Any Host)${NC}"
  else
    echo -e "  • [:${p}] 연희단 결 (GYEOL) 웹페이지 : ${RED}STOPPED${NC}"
  fi
  echo -e "${CYAN}=================================================================${NC}"
}

cmd_help() {
  echo -e "${CYAN}=================================================================${NC}"
  echo -e "${CYAN} 🥁 연희단 결 (GYEOL) run_port.sh 통합 관리 명령어${NC}"
  echo -e "${CYAN}=================================================================${NC}"
  echo -e "  ${BOLD}[서버 기동 / 제어]${NC}"
  echo -e "  • ${BOLD}./run_port.sh dev [PORT]${NC}              : 개발 모드 기동 (기본 포트: 30030)"
  echo -e "  • ${BOLD}./run_port.sh start [PORT]${NC}            : 운영(prod) 모드 기동 (기본 포트: 30030)"
  echo -e "  • ${BOLD}./run_port.sh prod [PORT]${NC}             : 운영(prod) 모드 기동"
  echo -e "  • ${BOLD}./run_port.sh debug [PORT]${NC}            : 디버그 모드 기동 (인스펙터 30031)"
  echo -e "  • ${BOLD}./run_port.sh [PORT]${NC}                  : 지정 포트로 운영 모드 즉시 기동 (예: ./run_port.sh 30030)"
  echo -e "  • ${BOLD}./run_port.sh stop [PORT]${NC}             : 서비스 종료"
  echo -e "  • ${BOLD}./run_port.sh restart [dev|prod] [PORT]${NC}: 서비스 재시작"
  echo -e "  • ${BOLD}./run_port.sh status [PORT]${NC}           : 포트 및 프로세스 상태 점검"
  echo ""
  echo -e "  ${BOLD}[컴파일 / 빌드 / 검사 / DB]${NC}"
  echo -e "  • ${BOLD}./run_port.sh compile${NC}                 : 전체 프로덕션 번들 빌드 (npm run build)"
  echo -e "  • ${BOLD}./run_port.sh build${NC}                   : 동일 (컴파일/빌드)"
  echo -e "  • ${BOLD}./run_port.sh tsc${NC}                     : TypeScript 정적 타입 검증 (tsc --noEmit)"
  echo -e "  • ${BOLD}./run_port.sh clean${NC}                   : 빌드 캐시(.next 등) 정리"
  echo -e "  • ${BOLD}./run_port.sh clean-build${NC}             : 캐시 정리 후 클린 재컴파일"
  echo -e "  • ${BOLD}./run_port.sh check${NC}                   : 타입 검사 후 전체 컴파일"
  echo -e "  • ${BOLD}./run_port.sh seed${NC}                    : grain_of_sound DB 초기 데이터 시딩"
  echo -e "${CYAN}=================================================================${NC}"
}

# ------------------------------------------------------------------------------
# 3. 메인 CLI 라우팅
# ------------------------------------------------------------------------------
ACTION="${1:-status}"
ARG2="${2:-}"
ARG3="${3:-}"

# 첫 번째 인자가 숫자인 경우 (예: ./run_port.sh 30030) -> 해당 포트로 운영 모드 즉시 기동
if [[ "$ACTION" =~ ^[0-9]+$ ]]; then
  PORT="$ACTION"
  cmd_start "prod" "$PORT"
  safe_exit $?
fi

# 포트 번호 해석
PORT="$DEFAULT_PORT"
TARGET_MODE=""

if [[ "$ARG2" =~ ^[0-9]+$ ]]; then
  PORT="$ARG2"
elif [[ "$ARG3" =~ ^[0-9]+$ ]]; then
  PORT="$ARG3"
  TARGET_MODE="$ARG2"
else
  TARGET_MODE="$ARG2"
fi

case "$ACTION" in
  # [서버 제어]
  dev)
    cmd_start "dev" "$PORT"
    safe_exit $?
    ;;
  dev:debug|debug)
    cmd_start "debug" "$PORT"
    safe_exit $?
    ;;
  start|prod)
    if [ "$TARGET_MODE" = "dev" ] || [ "$TARGET_MODE" = "debug" ]; then
      cmd_start "$TARGET_MODE" "$PORT"
    else
      cmd_start "prod" "$PORT"
    fi
    safe_exit $?
    ;;
  stop)
    cmd_stop "$PORT"
    safe_exit $?
    ;;
  restart)
    cmd_stop "$PORT"
    sleep 1
    if [ "$TARGET_MODE" = "dev" ]; then
      cmd_start "dev" "$PORT"
    elif [ "$TARGET_MODE" = "debug" ]; then
      cmd_start "debug" "$PORT"
    else
      cmd_start "prod" "$PORT"
    fi
    safe_exit $?
    ;;
  status)
    cmd_status "$PORT"
    safe_exit $?
    ;;

  # [컴파일 & 빌드 & DB]
  compile|build|all)
    cmd_compile
    safe_exit $?
    ;;
  tsc|typecheck)
    cmd_typecheck
    safe_exit $?
    ;;
  clean)
    cmd_clean
    safe_exit 0
    ;;
  clean-build|clean_build)
    cmd_clean
    cmd_compile
    safe_exit $?
    ;;
  check)
    cmd_typecheck || safe_exit 1
    cmd_compile
    safe_exit $?
    ;;
  seed)
    cmd_seed
    safe_exit $?
    ;;

  # [도움말]
  help|--help|-h)
    cmd_help
    safe_exit 0
    ;;

  *)
    echo -e "${RED}알 수 없는 명령어: ${ACTION}${NC}"
    cmd_help
    safe_exit 1
    ;;
esac

safe_exit 0
