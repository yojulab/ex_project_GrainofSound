# 네트워크·인프라(`https://neptune.axfoundly.com`, Port `3030`) & 자체 운영 MongoDB(`grain_of_sound`) 아키텍처 가이드

- **문서 참조**: [`docs/PRDs/gyeol.md`](file:///apps/ex_project_GrainofSound/docs/PRDs/gyeol.md) §4~§5 및 인프라 지정 사양
- **핵심 인프라 방침**:
  1. **공식 도메인 및 서비스 포트**: **`https://neptune.axfoundly.com`** / 애플리케이션 바인딩 포트 **`3030`** (`0.0.0.0:3030`, 디버그 인스펙터 포트 `3031`)
  2. **데이터베이스 명칭 (`grain_of_sound`)**: MongoDB 접속 DB명은 **`grain_of_sound`**를 사용하며, 3대 핵심 액션 폼(공연 섭외 신청, 단원 지원, 후원회원 가입 문의) 및 공연 아카이브 데이터를 영속화한다.
  3. **폼 데이터 하이브리드 수신 (DB + 즉시 알림 + 카카오톡 오픈채팅 병행)**:
     - 모달 간편 폼 제출 시 Next.js Serverless API를 통해 MongoDB(`grain_of_sound`)에 안전하게 기록함과 동시에 운영자 이메일(SMTP)/웹훅/스프레드시트로 즉시 알림을 발송한다.
     - 모든 모달 하단에는 **카카오톡 오픈채팅방 1:1 직통 버튼**을 병행 배치하여 모바일 사용자의 선택권을 보장한다.
  4. **VPC 사설망 격리 및 자동 백업**: 운영 환경 GCE VM MongoDB는 외부 공인 IP를 갖지 않으며(No Public IP), 매일 새벽 `mongodump`로 `grain_of_sound` DB를 백업한다.

---

## 1. 시스템 구성도

```mermaid
flowchart TD
    subgraph Users ["방문자 계층 (Mobile-First / 카카오톡 인앱)"]
        VISITOR["방문자 (복지관/지자체 섭외담당, 단원지원자, 후원희망자)"]
        KAKAO["카카오톡 채팅방 공유 스크래퍼 (OG 1200x630)"]
    end

    subgraph AppLayer ["애플리케이션 계층 (https://neptune.axfoundly.com : Port 3030)"]
        WEB["Next.js App (Port 3030)<br>One-Page 5단계 스토리텔링 + 3대 액션 모달 + Sticky CTA"]
        API["Serverless Form Handlers<br>/api/actions/performance | member | supporter"]
    end

    subgraph DataAndNotify ["데이터베이스 (grain_of_sound) & 알림 채널"]
        MONGO[("MongoDB: <b>grain_of_sound</b><br>(performanceRequests, memberApplications,<br>supporterInquiries, archiveItems)")]
        NOTIFY["즉시 알림 채널<br>(SMTP 이메일 / Google Sheets Webhook)"]
        OPENCHAT["카카오톡 1:1 오픈채팅 직통 연결"]
    end

    VISITOR -->|HTTPS (100dvh)| WEB
    KAKAO -->|OG 메타태그 수집| WEB
    WEB -->|방식 A: 간편 폼 제출| API
    WEB -->|방식 B: 카톡 직통 클릭| OPENCHAT
    API -->|영속화 저장| MONGO
    API -->|실시간 발송| NOTIFY
```

---

## 2. 네트워크, 포트 및 환경변수 상세 규격

### 2-1. 도메인 및 포트 바인딩 (`Port 3030`)
- **프로덕션/외부 접속 도메인**: `https://neptune.axfoundly.com`
- **내부 컨테이너/서버 리스닝 포트**: `3030` (`PORT=3030`, `HOSTNAME=0.0.0.0`)
- **Node.js 디버그 인스펙터 포트**: `3031`
- **통합 기동 스크립트 (`run_port.sh`)**:
  - `./run_port.sh dev` / `./run_port.sh prod` 실행 시 기본 포트 `3030`으로 기동한다.

### 2-2. MongoDB `grain_of_sound` 데이터베이스 구성
- **접속 URI 규격 (`.env`)**:
  - 컨테이너/로컬 환경: `MONGODB_URI=mongodb://admin:admin123@graphrag_agent_db_mongo:27017/grain_of_sound?authSource=admin`
  - GCP GCE 사설망 환경: `MONGODB_URI=mongodb://gyeol_app:${DB_PASS}@10.x.x.x:27017/grain_of_sound?authSource=grain_of_sound`
- **핵심 컬렉션**:
  1. `performancerequests`: `[공연 신청하기]` 접수 데이터
  2. `memberapplications`: `[일반회원(단원) 지원]` 접수 데이터
  3. `supporterinquiries`: `[후원회원 가입 문의]` 1:1 안내 요청 데이터 (**계좌번호/결제정보 필드 일체 없음**)
  4. `archiveitems`: `[나눔·복지 공연]` 및 `[축제·의전 공연]` 프로그램/갤러리 사진 아카이브
  5. `siteconfigs`: 단체 기본 정보(단체명, 고유번호, 소재지, 대표자, 연락처, 오픈채팅 URL)
  6. `adminusers` & `auditlogs`: 운영자 접수 확인 및 감사로그

### 2-3. 일일 자동 백업 파이프라인 (`grain_of_sound`)
- **백업 주기**: 매일 새벽 03:00 (KST) Cron 실행.
- **백업 절차**:
  ```bash
  # 1. grain_of_sound DB 덤프 추출
  mongodump --uri="${MONGODB_URI:?CRITICAL: MONGODB_URI required}" --out=/backup/dump_$(date +%Y%m%d)

  # 2. 압축 및 아카이빙
  tar -czf /backup/grain_of_sound_$(date +%Y%m%d).tar.gz /backup/dump_$(date +%Y%m%d)

  # 3. GCS 전송
  gcloud storage cp /backup/grain_of_sound_$(date +%Y%m%d).tar.gz gs://${GCS_BACKUP_BUCKET:?}/daily/
  ```

---

## 3. 백엔드 개발 및 데이터 무결성 가이드

1. **Mongoose 싱글톤 커넥션 (`src/lib/db/mongodb.ts`)**:
   - Next.js HMR 환경에서 커넥션 누수를 방지하기 위해 `global.mongoose` 캐싱 패턴을 적용한다.
   - 연결 대상 DB가 `grain_of_sound`인지 초기화 로그로 명확히 검증한다.
2. **NoSQL Injection 및 스팸 방어**:
   - 모든 3대 액션 폼 입력값은 `zod` 스키마를 통해 정제된 문자열/배열/열거형만 허용한다.
   - 비로그인 공개 폼의 특성상 **Honeypot 숨김 필드(`_gotcha`)**, **최소 작성 시간 검증**, **IP 기반 Rate Limit(분당 5회)**을 필수로 적용한다.
3. **환경 변수 `.env` 엄격 관리 및 디폴트 금지 (No-Default Policy)**:
   - `MONGODB_URI`, `PORT`, `NEXT_PUBLIC_APP_URL`, `SESSION_SECRET` 등은 반드시 `.env` 파일로부터 로드하며, 코드 내에 `|| 'smart_industry'`나 `|| 30013` 같은 과거 프로젝트의 잔재 또는 하드코딩된 폴백을 절대 허용하지 않는다.
