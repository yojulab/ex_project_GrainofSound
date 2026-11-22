# 비영리 전통연희단체 「연희단 결 (GYEOL : The Grain of Sound)」 도메인 엔지니어링 가이드

- **문서 참조**: [`docs/PRDs/gyeol.md`](file:///apps/ex_project_GrainofSound/docs/PRDs/gyeol.md)
- **프로젝트명**: **연희단 결 (GYEOL : The Grain of Sound) 공식 소개 및 섭외·모집 웹페이지**
- **서비스 URL & 포트**: **`https://haetae.cocolabhub.com`** (Port: **`3130`**, Inspector: `3131`)
- **데이터베이스**: MongoDB **`grain_of_sound`** (`mongodb://.../grain_of_sound`)
- **핵심 목적**:
  1. 단체 브랜드 아이덴티티 대외 홍보 ('공식 얼굴' 역할)
  2. 부천 관내 복지기관 및 지자체·대사관 행사 공연 섭외 접수 (`[공연 신청하기]`)
  3. 일반회원(연주 단원) 지원(`[일반회원(단원) 지원]`) 및 후원회원(서포터즈) 가입 문의 유치(`[후원회원 가입 문의]`)
- **운영 범위 제한 및 절대 가드레일**:
  1. **[GUARD-01] 후원 계좌번호 및 직접 결제창 노출 절대 금지**: 고유번호증 등록 비영리임의단체 기준에 따라 본문, 모달, 푸터 전 영역에 후원 계좌번호 텍스트나 직접 결제 버튼을 노출하지 않으며, 반드시 **'가입 문의 접수 → 담당자 확인 → 1:1 개별 연락을 통한 회비 납부 안내'** 프로세스로만 구현한다.
  2. **[GUARD-02] 내부 운영 기능 전면 배제**: 내부 단원 연습 일정 게시판, 악보/자료 공유, 일반 회원 로그인/회원가입 기능은 구현하지 않는다 (순수 대외 창구 역할에 집중).
  3. **[GUARD-03] 무로그인 즉시 접근**: 앱 설치 및 회원가입/로그인 절차 없이 단일 URL(`https://haetae.cocolabhub.com`) 접속 즉시 전 콘텐츠 열람 및 신청이 가능해야 한다.

---

## 1. 디자인 시스템 및 스타일 가이드 ('나무·한지·먹색' 에디토리얼 미니멀리즘)

레퍼런스 사이트(`https://fredericforest.com/`)의 **극단적 미니멀리즘, 넓은 여백, 얇고 유려한 선(Line), 에디토리얼 타이포그래피**를 한국 전통의 **'나무·한지·먹색'** 질감으로 재해석한다.

### 1-1. 컬러 팔레트 (Color Tokens)
| 토큰명 | HEX 코드 | CSS 변수명 권장 | 용도 및 적용 범위 |
| :--- | :--- | :--- | :--- |
| **Background Primary (한지 백색)** | `#F6F3EC` | `--bg-hanji` | 차가운 순백색(`#FFFFFF`) 대신 따뜻하고 은은한 한지 톤 기본 배경 |
| **Background Secondary (고목 베이지)** | `#EAE4D7` | `--bg-wood-beige` | 카드 영역, 모달/입력 폼 배경, 섹션 구분용 서브 배경 |
| **Text & Line Primary (농묵/먹색)** | `#1A1917` | `--text-ink` | 메인 타이틀, 본문 텍스트, 핵심 아트워크 먹선 |
| **Text Secondary (담묵/회갈색)** | `#5C564F` | `--text-muted-ink` | 부제, 캡션, 보조 설명 문구 |
| **Accent Primary (고목 브라운)** | `#4A3525` | `--accent-wood` | 주요 액션 버튼(CTA) 기본 배경 및 강조 요소 |
| **Accent Point (인장 주홍/낙관색)** | `#A63A2B` | `--accent-seal` | 필수 입력 표시(`*`), 낙관 형태 포인트 아이콘, 호버/포커스 포인트 |
| **Hairline Border (먹선 구분선)** | `#D8D0C5` | `--line-hairline` | 섹션 및 카드 구분용 `1px solid #D8D0C5` 얇은 선 |

### 1-2. 타이포그래피 (Typography)
- **영문 슬로건 및 헤딩**: `Cormorant Garamond` 또는 `Playfair Display` (우아하고 가늘게 뻗는 세리프체로 *"The Grain of Sound, GYEOL"* 강조)
- **국문 헤딩 (타이틀/슬로건)**: `MaruBuri(마루부리)` 또는 `Noto Serif KR(본명조)` — 소리의 결과 전통의 품격을 보여주는 명조 계열
- **국문 본문 및 UI 버튼**: `Pretendard` — 모바일 화면에서 복지관 담당자 및 중장년층 지원자가 읽기에 가장 명확한 고딕 계열 (**본문 최소 크기 `16px`, 줄간격 `1.65` 이상 필수 확보**)

### 1-3. 비주얼 & 인터랙션 무드
- **텍스처 및 선(Grain & Line)**: 배경에 미세한 한지 질감 노이즈(투명도 3~5%)를 깔고, 섹션 간 구분은 무거운 박스 대신 `1px solid #D8D0C5`의 얇은 먹선과 넓은 상하 여백(`padding: 64px 20px`)으로 처리한다.
- **모션 효과**: 스크롤 시 텍스트와 이미지가 아래에서 위로 잔잔하게 떠오르는 페이드인(`Fade-up`, `duration: 0.6s`) 효과만 절제하여 적용한다 (`prefers-reduced-motion` 존중).

---

## 2. 화면 구성 및 원페이지 5단계 스토리텔링 IA (One-Page IA)

단일 페이지(`/`)에서 위에서 아래로 자연스럽게 읽히며 신뢰를 쌓고, 하단에서 즉각적인 행동(섭외·지원·후원)으로 이어지는 5단계 구조로 설계한다:

```text
https://haetae.cocolabhub.com/ (One-Page 공식 웹페이지, Port 3130)
├── [Header] 상단 미니멀 로고 ("연희단 결 | GYEOL") + 섹션 앵커 이동
├── [Section 01: #hero] Hero (도입부 — 100dvh 풀폭 비주얼 & 슬로건)
├── [Section 02: #about] About (단체 소개 & 3대 핵심 가치 카드)
├── [Section 03: #repertoire] Repertoire & Archive (맞춤형 공연 프로그램 탭 & 활동 갤러리)
├── [Section 04: #join] Join Us (일반단원 모집 & 후원회원 서포터즈 안내)
├── [Section 05: #action] Action Center (3대 주요 액션 트리거 & 카카오톡 오픈채팅 안내)
├── [Footer] 단체 기본 정보 (고유번호증 등록 비영리임의단체 — 후원 계좌번호 노출 절대 금지)
├── [Sticky Bottom CTA] 모바일 화면 최하단 고정 바 ([공연 신청] / [단원 지원] / [후원 문의])
└── [Modals] 3대 맞춤형 간편 접수 모달
    ├── M01: [공연 신청하기] 모달 (섭외 담당자용 + 카톡 오픈채팅 병행)
    ├── M02: [일반회원(단원) 지원] 모달 (연주 단원 지원자용 + 카톡 오픈채팅 병행)
    └── M03: [후원회원 가입 문의] 모달 (서포터즈 희망자용, 1:1 안내 고지 + 카톡 병행)
```

### 2-1. 섹션별 상세 구현 규격
1. **01 Hero (`#hero`)**:
   - 상단 미니멀 로고: **`연희단 결 | GYEOL`**
   - 메인 영문 슬로건: ***"The Grain of Sound, GYEOL"***
   - 국문 서브 카피: ***"나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결"***
   - 장구·소고의 실루엣이나 먹선 드로잉(또는 고해상도 공연 흑백/세피아톤 사진) 풀폭 배치
   - 모바일 인앱 브라우저 대응 **`min-h-[100dvh]`** 적용 및 하단 스크롤 유도 인디케이터 배치
2. **02 About (`#about`)**:
   - **단체의 정체성**: 부천을 거점으로 전통연희의 멋을 나누는 비영리 예술 공동체 소개
   - **3대 핵심 가치 카드**:
     1) **나눔의 결**: 요양원·복지관 등 문화 소외 이웃을 찾아가는 치유와 흥의 무대
     2) **교류의 결**: 지자체 축제, 대사관 문화교류 등 한국의 미를 알리는 공식 초청 공연
     3) **이음의 결**: 전통문화 계승 및 청소년 예술 활동을 지원하는 열린 공동체
3. **03 Repertoire & Archive (`#repertoire`)**:
   - **섭외 맞춤형 프로그램 안내 (탭 또는 스와이프 카드)**:
     - **`[나눔·복지 공연]`**: 어르신 맞춤형 민요, 장구·소고 신명 한마당 (요양원·복지관 최적화)
     - **`[축제·의전 공연]`**: 길놀이, 사물판굿, 한국 전통연희 갈라 프로그램 (구청·대사관·공식 행사)
   - **활동 아카이브 갤러리**: 정사각형(`1:1`) 또는 `4:5` 비율의 깔끔한 그리드 사진첩 (클릭 시 확대 보기 라이트박스 모달 지원, `WebP` + `loading="lazy"`)
4. **04 Join Us (`#join`)**:
   - **일반단원 모집 안내**: 부천 및 인근 지역 거주자 중 장구·소고·민요 유경험자 환영 안내 (활동 지역, 연습 분위기 요약)
   - **후원회원(서포터즈) 안내**: 전통문화 나눔 공연과 청소년 예술 활동에 회비로 힘을 보태는 의미 설명
5. **05 Action Center (`#action`) & Sticky Bottom CTA**:
   - 3대 주요 액션 버튼(`[공연 신청하기]`, `[일반회원(단원) 지원]`, `[후원회원 가입 문의]`) 및 카카오톡 오픈채팅 연결 영역
   - 모바일 화면 최하단 고정 바(Sticky Bottom CTA)와 상태 동기화 (모달 오픈 시 배경 스크롤 잠금, 푸터 영역과 겹치지 않도록 하단 패딩 확보)
6. **Footer**:
   - 단체명: `연희단 결 (고유번호증 등록 비영리임의단체)`
   - 소재지: `경기도 부천시` (상세 주소 또는 활동 거점 표기)
   - 대표자명, 고유번호, 공식 연락처/이메일
   - **※ 주의: 후원 계좌번호 텍스트 노출 절대 금지**

---

## 3. 3대 핵심 액션 모달 폼 상세 명세

### 3-1. `[공연 신청하기]` 모달 (`M01` — 섭외 담당자용)
- **입력 필드**:
  1. `organization` — **기관/단체명** (텍스트, 필수 — 예: OO요양원, 종로구청, OO대사관)
  2. `contactNameAndPhone` (또는 `contactName` + `contactPhone`) — **담당자 성함 및 연락처** (텍스트/전화번호, 필수)
  3. `preferredDateAndPlace` — **공연 희망 일시 및 장소** (텍스트/날짜, 필수)
  4. `eventType` — **행사 성격 및 대상** (라디오 버튼, 필수: `복지·나눔 공연` / `지역 축제·문화행사` / `외교·기관 초청` / `기타`)
  5. `notes` — **기타 요청사항** (멀티라인 텍스트, 선택 — 예산 범위, 희망 소요 시간 등)
- **하단 보조 버튼**: `[카카오톡으로 바로 섭외 문의하기]` 병행 배치

### 3-2. `[일반회원(단원) 지원]` 모달 (`M02` — 연주 단원 지원자용)
- **입력 필드**:
  1. `nameAndPhone` (또는 `applicantName` + `phone`) — **성함 및 연락처** (텍스트/전화번호, 필수)
  2. `region` — **거주 지역** (텍스트, 필수 — 예: 부천시 소사구, 원미구, 인근 지역 등)
  3. `specialties` — **주요 분야 (복수 선택 가능)** (체크박스, 최소 1개 필수: `장구` / `소고` / `민요` / `기타 전통연희`)
  4. `experienceAndIntro` — **연주 경력 및 간단한 소개** (멀티라인 텍스트, 필수 — 동호회 활동, 강습 이력 등 자유 기재)
- **제출 완료 메시지**:
  > *"지원해 주셔서 감사합니다. 담당 단원이 확인 후 기재해 주신 연락처로 연습 일정 및 참관 안내를 드리겠습니다."*
- **하단 보조 버튼**: 카카오톡 오픈채팅 문의 버튼 병행 배치

### 3-3. `[후원회원 가입 문의]` 모달 (`M03` — 서포터즈 희망자용, 법적 기준 엄수)
- **법적 가드레일**:
  - 후원 계좌번호나 직접 결제창 노출 절대 금지.
  - 반드시 `가입 문의 접수 → 담당자 확인 → 1:1 개별 연락을 통한 회비 납부 안내` 프로세스로 구현.
- **모달 상단 필수 고지 문구**:
  > *"연희단 결은 전통문화 나눔과 청소년 예술 활동의 뜻에 공감하는 후원회원(서포터즈) 분들의 회비로 운영됩니다. 비영리임의단체 운영 규정에 따라, 아래에 연락처를 남겨주시면 담당자가 1:1로 연락드려 후원회원 가입 및 회비 납부 절차를 상세히 안내해 드립니다."*
- **입력 필드**:
  1. `supporterNameOrOrg` — **성함 (또는 단체/기업명)** (텍스트, 필수)
  2. `phone` — **연락받으실 휴대전화 번호** (전화번호, 필수)
  3. `preferredContactMethod` — **선호하는 안내 방식** (라디오 버튼, 필수: `문자/카카오톡 안내 희망` / `전화 통화 희망`)
  4. `supportType` — **참여 희망 형태** (라디오 버튼, 필수: `정기 후원회원 가입 문의` / `일시 회비 납부 문의`)
  5. `cheeringMessage` — **연희단 결에 전하는 응원 한마디** (텍스트, 선택)
- **하단 보조 버튼**: 카카오톡 오픈채팅 문의 버튼 병행 배치

---

## 4. 데이터 모델 규격 (MongoDB `grain_of_sound` / Mongoose)

`.env`의 `MONGODB_URI`(`mongodb://.../grain_of_sound`)에 연결되는 핵심 컬렉션 규격이다:

```typescript
// 1. 공연 섭외 신청 (performanceRequests)
interface PerformanceRequest {
  _id: ObjectId;
  organization: string;          // 기관/단체명 (필수)
  contactName: string;           // 담당자 성함 (필수)
  contactPhone: string;          // 담당자 연락처 (필수)
  preferredDatePlace: string;    // 공연 희망 일시 및 장소 (필수)
  eventType: 'welfare' | 'festival' | 'diplomatic' | 'other'; // 복지·나눔 / 지역 축제·문화행사 / 외교·기관 초청 / 기타
  notes?: string;                // 기타 요청사항 (선택)
  status: 'received' | 'contacted' | 'confirmed' | 'archived';
  notificationSent: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. 일반회원(연주 단원) 지원 (memberApplications)
interface MemberApplication {
  _id: ObjectId;
  applicantName: string;         // 성함 (필수)
  phone: string;                 // 연락처 (필수)
  region: string;                // 거주 지역 (필수)
  specialties: ('janggu' | 'sogo' | 'minyo' | 'other')[]; // 장구 / 소고 / 민요 / 기타 전통연희 (복수 선택)
  experienceAndIntro: string;    // 연주 경력 및 간단한 소개 (필수)
  status: 'received' | 'contacted' | 'joined' | 'archived';
  notificationSent: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

// 3. 후원회원(서포터즈) 가입 문의 (supporterInquiries) — 계좌/결제 정보 저장 없음, 1:1 안내용
interface SupporterInquiry {
  _id: ObjectId;
  supporterNameOrOrg: string;    // 성함 또는 단체/기업명 (필수)
  phone: string;                 // 연락받으실 휴대전화 번호 (필수)
  preferredContactMethod: 'message_kakao' | 'phone_call'; // 문자/카카오톡 안내 희망 | 전화 통화 희망
  supportType: 'regular' | 'onetime'; // 정기 후원회원 가입 문의 | 일시 회비 납부 문의
  cheeringMessage?: string;      // 응원 한마디 (선택)
  status: 'received' | 'guided_1to1' | 'completed' | 'archived';
  notificationSent: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

// 4. 공연 아카이브 갤러리 & 레퍼토리 (archiveItems)
interface ArchiveItem {
  _id: ObjectId;
  category: 'welfare' | 'festival'; // 나눔·복지 공연 | 축제·의전 공연
  title: string;                 // 공연/활동 제목
  subtitle: string;              // 장소 및 일자 요약 (예: 부천시 노인복지관 나눔 공연)
  description: string;           // 상세 설명
  imageUrl: string;              // WebP 이미지 경로
  imageAlt: string;              // 접근성 대체텍스트 (필수)
  aspectRatio: '1:1' | '4:5';
  sortOrder: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 5. 카카오톡 공유 및 모바일 최적화 필수 사양

1. **Open Graph 메타태그 (필수)**:
   - `og:title`: `연희단 결 (GYEOL : The Grain of Sound)`
   - `og:description`: `전통의 결로 이웃과 세계를 잇는 비영리 전통연희단체 연희단 결 공식 페이지입니다. 공연 섭외 및 단원·후원회원 모집 안내`
   - `og:image`: `https://haetae.cocolabhub.com/og-gyeol-hanji.png` (한지 배경 위에 로고와 슬로건이 배치된 `1200x630` 비율 대표 썸네일)
   - `og:url`: `https://haetae.cocolabhub.com`
2. **인앱 브라우저 뷰포트 최적화**:
   - 모바일 카카오톡 인앱 브라우저의 상하단 주소창 가림 현상을 방지하기 위해 높이 단위는 `100vh` 대신 **`100dvh`(Dynamic Viewport Height)**를 사용한다.
3. **이미지 및 초기 렌더링 성능**:
   - 공연 사진은 모두 `WebP` 포맷 압축 및 `loading="lazy"` 속성을 적용하여 모바일 데이터 환경에서도 **1.5초 이내**에 초기 화면이 렌더링되도록 구성한다.
