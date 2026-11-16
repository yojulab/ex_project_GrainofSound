# 비영리 전통연희단체 「연희단 결 (GYEOL : The Grain of Sound)」 공식 웹페이지

부천을 거점으로 전통연희의 멋을 나누는 비영리 예술 공동체 **「연희단 결 (GYEOL : The Grain of Sound)」**의 브랜드 아이덴티티 대외 홍보, 복지기관·지자체·대사관 공연 섭외 접수, 일반회원(연주 단원) 지원 및 후원회원(서포터즈) 가입 문의를 위한 **Mobile-First 원페이지(One-Page) 공식 웹페이지**입니다.

- **기준 사양서**: [`docs/PRDs/gyeol.md`](file:///apps/ex_project_GrainofSound/docs/PRDs/gyeol.md)
- **공식 도메인 / 포트**: **`https://neptune.axfoundly.com`** / Port **`3030`** (Node Inspector: `3031`)
- **데이터베이스**: MongoDB **`grain_of_sound`** (`mongodb://.../grain_of_sound`)
- **디자인 테마**: 레퍼런스(`https://fredericforest.com/`) 기반 한국 전통 **'나무·한지(`#F6F3EC`)·먹색(`#1A1917`)·고목(`#4A3525`)·낙관(`#A63A2B`)'** 에디토리얼 미니멀리즘
- **핵심 원칙**:
  1. **법적 준수 (Zero-Tolerance)**: 고유번호증 등록 비영리임의단체 기준에 따라 본문·모달·푸터 전 영역에 **후원 계좌번호 및 직접 결제창 노출 절대 금지** (`가입 문의 접수 → 담당자 확인 → 1:1 개별 안내` 프로세스 엄수)
  2. **대외 창구 집중**: 앱 설치 및 일반 방문자 로그인/회원가입 절차 전면 배제, 내부 단원 연습 일정/악보 공유 기능 미포함
  3. **카카오톡 인앱 최적화**: `100dvh` 뷰포트, Sticky Bottom CTA 안전 여백, `1200x630` 한지 톤 Open Graph 미리보기 카드, `WebP` + `loading="lazy"` 기반 1.5초 이내 초기 렌더링

---

## 1. 화면 구성 (One-Page 5단계 스토리텔링 IA & 3대 액션 모달)

| 순서 | 섹션 코드 | 섹션명 | 핵심 노출 콘텐츠 및 UI 구성 요소 |
| :--- | :--- | :--- | :--- |
| **01** | `G01` | **Hero (도입부)** | 상단 미니멀 로고(`연희단 결 \| GYEOL`), 영문 슬로건(*"The Grain of Sound, GYEOL"*), 국문 서브 카피(*"나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결"*), 장구·소고 먹선/세피아 비주얼 풀폭(`100dvh`), 스크롤 인디케이터 |
| **02** | `G02` | **About (단체 소개)** | 부천 거점 비영리 예술 공동체 정체성 및 3대 핵심 가치 카드 (`나눔의 결`, `교류의 결`, `이음의 결`) |
| **03** | `G03` | **Repertoire & Archive** | 섭외 맞춤형 프로그램 탭(`[나눔·복지 공연]`, `[축제·의전 공연]`), 정사각형/4:5 비율 활동 아카이브 그리드 사진첩 (클릭 시 라이트박스 확대 보기) |
| **04** | `G04` | **Join Us (함께하는 길)** | 일반단원 모집 안내(부천 및 인근 장구·소고·민요 유경험자 환영), 후원회원(서포터즈) 회비 후원 의미 안내 |
| **05** | `G05` | **Action Center & Sticky CTA** | 3대 주요 액션 버튼 (`[공연 신청하기]`, `[일반회원(단원) 지원]`, `[후원회원 가입 문의]`) + 모바일 최하단 고정 바(Sticky Bottom CTA) + 카카오톡 오픈채팅 직결 |
| **Footer** | `G00` | **단체 기본 정보** | 단체명(`연희단 결 (고유번호증 등록 비영리임의단체)`), 소재지(`경기도 부천시`), 대표자명, 고유번호, 공식 연락처/이메일 (**후원 계좌번호 노출 절대 금지**) |

---

## 2. 데이터베이스(`grain_of_sound`) 및 환경 변수(`.env`) 설정

중요 보안 및 네트워크 환경변수는 코드 내 디폴트값(Fallback) 없이 `.env` 파일에서만 중앙 관리됩니다:

```ini
# 1. 데이터베이스 연결 URI (DB명: grain_of_sound)
MONGODB_URI=mongodb://admin:admin123@graphrag_agent_db_mongo:27017/grain_of_sound?authSource=admin

# 2. 서비스 네트워크 포트 및 공식 도메인 URL
PORT=3030
NEXT_PUBLIC_APP_URL=https://neptune.axfoundly.com
BASE_URL=https://neptune.axfoundly.com

# 3. 카카오톡 오픈채팅 1:1 직통 연결 URL
NEXT_PUBLIC_KAKAO_OPENCHAT_URL=https://open.kakao.com/o/gyeol_official

# 4. 초기 운영자 자격증명 (접수 내역 및 아카이브 관리용)
INITIAL_ADMIN_USERNAME=admin
INITIAL_ADMIN_EMAIL=admin@gyeol.or.kr
INITIAL_ADMIN_PASSWORD=Admin1234!
```

### DB 초기화 및 시드 명령어
```bash
# [A] grain_of_sound 데이터베이스 점검 및 기본 아카이브/설정 시딩
npm run seed

# [B] 데이터베이스 전체 리셋 및 표준 아카이브 데이터 재투입
npm run seed:reset
```

---

## 3. 통합 관리 스크립트 (`run_port.sh` — 기본 포트 `3030`)

외부 접속 허용을 위한 **Any Host(`0.0.0.0`) 바인딩** 및 **포트 `3030` 실행**, **프로덕션 빌드/컴파일**을 단일 스크립트(`run_port.sh`)로 관리합니다.

```bash
# 1. 개발(dev) 모드 기동 (기본 포트 3030)
./run_port.sh dev
./run_port.sh dev 3030

# 2. 운영(prod) 모드 기동 (사전 빌드 없으면 자동 컴파일 후 포트 3030 기동)
./run_port.sh start
./run_port.sh prod

# 3. 디버그 모드 기동 (Port 3030 + Node Inspector 3031)
./run_port.sh debug

# 4. 서비스 상태 점검 및 중지/재시작
./run_port.sh status
./run_port.sh stop
./run_port.sh restart
```

---

## 4. 하네스 엔지니어링 (Vibe Coding Harness Architecture)

본 프로젝트는 Google Antigravity / Gemini 환경에 최적화된 **6대 전문 에이전트 팀**과 **전용 스킬/규칙 체계**로 구성되어 있습니다:

- **상위 헌장 및 에이전트 가이드**: [`GEMINI.md`](file:///apps/ex_project_GrainofSound/GEMINI.md), [`AGENTS.md`](file:///apps/ex_project_GrainofSound/AGENTS.md)
- **도메인 및 아키텍처 규칙 (`.agents/rules/`)**:
  - [`gyeol-domain.md`](file:///apps/ex_project_GrainofSound/.agents/rules/gyeol-domain.md): 한지·먹색·고목 디자인 토큰, 5단계 원페이지 IA, 3대 액션 모달 및 법적 가드레일
  - [`architecture-mongodb-gcp.md`](file:///apps/ex_project_GrainofSound/.agents/rules/architecture-mongodb-gcp.md): `https://neptune.axfoundly.com` (Port `3030`) 및 MongoDB `grain_of_sound` 아키텍처
  - [`admin-security.md`](file:///apps/ex_project_GrainofSound/.agents/rules/admin-security.md): 법적 가드레일(계좌 미노출), 스팸 방어, 모바일 가독성 및 1.5초 렌더링 규격
  - [`ui-tagging-inspection.md`](file:///apps/ex_project_GrainofSound/.agents/rules/ui-tagging-inspection.md): `Alt+I` UI inspect 일련번호 태깅 규격 (`G00`~`G05`, `M01`~`M03`)
- **전용 스킬 (`.agents/skills/`)**:
  - [`gyeol-editorial-ui`](file:///apps/ex_project_GrainofSound/.agents/skills/gyeol-editorial-ui/SKILL.md): 에디토리얼 미니멀리즘 UI & 원페이지 5단계 섹션 퍼블리싱 스킬
  - [`gyeol-action-forms`](file:///apps/ex_project_GrainofSound/.agents/skills/gyeol-action-forms/SKILL.md): 3대 핵심 액션 모달 폼 & 법적 가드레일 & 카톡 오픈채팅 연동 스킬
  - [`gcp-mongo-ops`](file:///apps/ex_project_GrainofSound/.agents/skills/gcp-mongo-ops/SKILL.md): Port `3030` 및 MongoDB `grain_of_sound` 운영/백업 스킬
  - [`ralph-loop`](file:///apps/ex_project_GrainofSound/.agents/skills/ralph-loop/SKILL.md): 자율 반복 루프 엔지니어링 스킬 (체크리스트: [`.agents/loop/task.md`](file:///apps/ex_project_GrainofSound/.agents/loop/task.md))
