# Ralph Loop 작업 체크리스트 — 비영리 전통연희단체 「연희단 결 (GYEOL : The Grain of Sound)」 WBS

> **기준 문서**: [`docs/PRDs/gyeol.md`](file:///apps/ex_project_GrainofSound/docs/PRDs/gyeol.md)
> **서비스 도메인 / 포트**: `https://neptune.axfoundly.com` / Port `30030`
> **데이터베이스**: MongoDB `grain_of_sound` (`mongodb://.../grain_of_sound`)
> 에이전트는 미완료(`[ ]`) 항목 중 1개를 선택하여 구현 및 검증을 완료한 후 `[x]`로 갱신하고 원자적 Git Commit을 수행합니다.
> 모든 항목이 `[x]`가 되면 사전에 정의된 `completion_promise`를 출력하고 루프를 종료합니다.

## 공정별 활성 태스크 목록 (G-01 ~ G-12)

### Phase 1. 기반 인프라 · 디자인 시스템 · DB 모델링 (`grain_of_sound`)
- [ ] **G-01**: Next.js (App Router) + TS + Tailwind CSS 초기 설정, Port `30030` (`run_port.sh`), `https://neptune.axfoundly.com` 및 `src/lib/config/env.ts` 무폴백 환경변수 검증 모듈 구축
- [ ] **G-02**: 한국 전통 '나무·한지·먹색' 컬러 토큰(`#F6F3EC`, `#EAE4D7`, `#1A1917`, `#5C564F`, `#4A3525`, `#A63A2B`), 타이포그래피(`Cormorant Garamond`, `Noto Serif KR`/`MaruBuri`, `Pretendard`), 한지 노이즈 텍스처(3~5%), `1px solid #D8D0C5` 먹선 및 `Fade-up`(`0.6s`) 모션 구축
- [ ] **G-03**: MongoDB(`grain_of_sound`) 스키마(`PerformanceRequest`, `MemberApplication`, `SupporterInquiry`, `ArchiveItem`, `SiteConfig`, `AdminUser`, `AuditLog`) 정의 및 초기 시드(`npm run seed`) 스크립트 작성

### Phase 2. 원페이지 5단계 스토리텔링 섹션 구현 (One-Page IA)
- [ ] **G-04**: **Section 01 Hero (도입부)** — 상단 미니멀 로고(`연희단 결 | GYEOL`), 영문 슬로건(*"The Grain of Sound, GYEOL"*), 국문 서브 카피(*"나무와 가죽, 사람의 숨결이 빚어내는 우리 소리의 결"*), 장구·소고 먹선/세피아 비주얼 풀폭 배치, `100dvh` 뷰포트 및 스크롤 인디케이터 구현
- [ ] **G-05**: **Section 02 About (단체 소개)** — 부천 거점 비영리 예술 공동체 정체성 소개 및 3대 핵심 가치 카드(`나눔의 결`, `교류의 결`, `이음의 결`) 구현
- [ ] **G-06**: **Section 03 Repertoire & Archive (공연 프로그램)** — 섭외 맞춤형 프로그램 탭(`[나눔·복지 공연]`, `[축제·의전 공연]`), 정사각형/4:5 비율 활동 아카이브 갤러리(WebP + `loading="lazy"` + 클릭 시 확대 라이트박스) 구현
- [ ] **G-07**: **Section 04 Join Us (함께하는 길) & Footer (단체 기본 정보)** — 일반단원 모집 안내, 후원회원(서포터즈) 안내, Footer(고유번호증 등록 비영리임의단체, 경기도 부천시, 대표자명, 고유번호, 연락처/이메일 — **후원 계좌번호 노출 절대 금지**) 구현

### Phase 3. 3대 핵심 액션 모달 폼 · Sticky CTA · 백엔드 연동
- [ ] **G-08**: **Section 05 Action Center & 모바일 하단 고정 바(Sticky Bottom CTA)** — 본문 액션 영역과 모바일 하단 고정 바 연동 (콘텐츠 가림 방지 Safe Area 여백 확보)
- [ ] **G-09**: **3대 맞춤형 액션 모달 폼(`M01~M03`) & 카카오톡 오픈채팅 직결 버튼 병행 구현**:
  - `M01 [공연 신청하기]`: 기관/단체명, 담당자 성함/연락처, 희망 일시/장소, 행사 성격 라디오 4종, 기타 요청사항 + `[카카오톡으로 바로 섭외 문의하기]`
  - `M02 [일반회원(단원) 지원]`: 성함/연락처, 거주 지역, 주요 분야 복수선택 체크박스(장구/소고/민요/기타), 연주 경력/소개 + 지정 완료 메시지
  - `M03 [후원회원 가입 문의]`: 비영리임의단체 1:1 안내 필수 법적 고지문, 성함/단체명, 휴대전화, 선호 안내 방식 라디오, 참여 희망 형태 라디오, 응원 한마디 (**계좌번호/결제창 전면 배제**)
- [ ] **G-10**: **3대 폼 수신 API (`/api/actions/*`) & 운영자 알림/경량 관리 뷰 구현** — Zod 검증, Honeypot/IP 레이트리밋, `grain_of_sound` DB 적재, 이메일/웹훅 알림, 비공개 접수 조회(`/admin`)

### Phase 4. 카카오톡 최적화 · UI Inspect · 종합 QA 검수
- [ ] **G-11**: **카카오톡 공유 Open Graph(`1200x630` 한지 썸네일) & 모바일 1.5초 렌더링 최적화 & `Alt+I` UI inspect 태깅(`G00`~`G05`, `M01`~`M03`)**
- [ ] **G-12**: **PRD §6 5대 QA 체크리스트 전수 검증** (한지·먹색·고목 톤앤매너, 카톡 인앱 `100dvh` 및 Sticky 바 동작, 후원 계좌번호/결제 버튼 0건 스캔, 3대 모달+카톡 오픈채팅 E2E, 로그인/내부일정 등 불필요 기능 제외 확인)
