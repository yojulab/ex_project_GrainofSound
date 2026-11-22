---
name: gcp-mongo-ops
description: "연희단 결(GYEOL) 인프라 프로비저닝, https://haetae.cocolabhub.com (Port 3130) 배포 및 자체 운영 MongoDB(grain_of_sound) 구축·운영 스킬. GCE VM/컨테이너 MongoDB(grain_of_sound) 설정, No Public IP 보안 격리, SCRAM-SHA-256 인증, 일일 자동 mongodump 백업(GCS 연동) 및 복구(restore) 리허설 수행 시 사용한다."
---

# 인프라(`https://haetae.cocolabhub.com`, Port `3130`) & MongoDB(`grain_of_sound`) 운영 스킬

비영리 전통연희단체 「연희단 결 (GYEOL : The Grain of Sound)」 공식 웹페이지(`https://haetae.cocolabhub.com`, Port `3130`)의 백엔드 데이터베이스(`grain_of_sound`)를 자체 구축·운영하고, 안전한 사설망 통신 및 자동 백업 체계를 관리하는 절차다.

---

## 1. MongoDB `grain_of_sound` 자체 구축 및 계정 절차

### 1-1. 데이터베이스 및 네트워크 사양
- **서비스 도메인**: `https://haetae.cocolabhub.com`
- **애플리케이션 바인딩 포트**: `3130` (디버그 포트: `3131`)
- **대상 데이터베이스명**: **`grain_of_sound`**
- **컨테이너/로컬 접속 URI (`.env`)**:
  `MONGODB_URI=mongodb://admin:admin123@graphrag_agent_db_mongo:27017/grain_of_sound?authSource=admin`
- **운영 GCE VM 사설망**: 공인 IP 미할당 (`--no-address`), 내부 포트 `27017`

### 1-2. MongoDB 유저 및 `grain_of_sound` DB 초기화
```bash
mongosh <<EOF
use admin
db.createUser({
  user: "gyeol_admin",
  pwd: "STRONG_ADMIN_PASSWORD_FROM_ENV",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" }, { role: "readWriteAnyDatabase", db: "admin" } ]
})

use grain_of_sound
db.createUser({
  user: "gyeol_app",
  pwd: "STRONG_APP_PASSWORD_FROM_ENV",
  roles: [ { role: "readWrite", db: "grain_of_sound" } ]
})
EOF
```

---

## 2. 서비스 기동 및 포트(`3130`) 바인딩

1. **로컬 및 컨테이너 기동 (`run_port.sh`)**:
   ```bash
   # 개발 모드 기동 (Port 3130)
   ./run_port.sh dev

   # 프로덕션 빌드 및 기동 (Port 3130)
   ./run_port.sh prod
   ```
2. **Cloud Run / 리버스 프록시 배포 (`https://haetae.cocolabhub.com`)**:
   - 외부 HTTPS(`443`) 트래픽을 내부 컨테이너 포트 `3130`으로 라우팅한다.
   - 환경 변수 `PORT=3130`, `NEXT_PUBLIC_APP_URL=https://haetae.cocolabhub.com`, `BASE_URL=https://haetae.cocolabhub.com`, `MONGODB_URI`를 주입한다.

---

## 3. 일일 자동 백업 및 복구 파이프라인 (`grain_of_sound`)

### 3-1. 백업 스크립트 (`/opt/scripts/backup_mongo.sh`)
```bash
#!/usr/bin/env bash
set -euo pipefail

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mongodb"
BUCKET="gs://${GCS_BACKUP_BUCKET:?}/daily"

mkdir -p "$BACKUP_DIR"

# 1. grain_of_sound 덤프 생성
mongodump --uri="${MONGODB_URI:?CRITICAL: MONGODB_URI is required}" --out="${BACKUP_DIR}/dump_${DATE}"

# 2. 압축
tar -czf "${BACKUP_DIR}/grain_of_sound_dump_${DATE}.tar.gz" -C "${BACKUP_DIR}" "dump_${DATE}"

# 3. Cloud Storage 업로드
gcloud storage cp "${BACKUP_DIR}/grain_of_sound_dump_${DATE}.tar.gz" "${BUCKET}/"

# 4. 임시 파일 정리
rm -rf "${BACKUP_DIR}/dump_${DATE}" "${BACKUP_DIR}/grain_of_sound_dump_${DATE}.tar.gz"
```
- Crontab 등록: `0 3 * * * /opt/scripts/backup_mongo.sh >> /var/log/mongo_backup.log 2>&1`

### 3-2. 복구(Restore) 리허설 절차
1. 최신 백업 아카이브 다운로드: `gcloud storage cp gs://.../daily/grain_of_sound_dump_YYYYMMDD.tar.gz .`
2. 압축 해제 및 복구 명령:
   `mongorestore --uri="${MONGODB_URI:?}" --drop ./dump_YYYYMMDD/`
3. `grain_of_sound` 내 4대 컬렉션(`performancerequests`, `memberapplications`, `supporterinquiries`, `archiveitems`) 정합성 검증.
