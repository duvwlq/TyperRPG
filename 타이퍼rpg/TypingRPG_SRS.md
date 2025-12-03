TypingRPG — SRS (Edited for Spring Boot backend plan, UI-explanations only)
문서 목적

이 문서는 TypingRPG(레퍼런스: https://typingrpg.netlify.app)를
 프론트엔드(UI) 설명은 유지, 구현 코드(백엔드/DB 등)는 제거한 상태로 SRS(Software Requirements Specification) 형식으로 재정리한 문서입니다. 또한 백엔드 구현을 Spring Boot 기반으로 진행할 경우의 아키텍처/엔드포인트/데이터 모델/운영·배포 방안을 상세히 제안합니다. (원본의 기능·UI·데이터·페이지 흐름·비기능 요구사항을 기반으로 편집). 

ypingRPG 웹사이트(httpstypingrpg.ne…

범위(요약)

대상: SPA 기반 TypingRPG 클론(프론트엔드 UI 완성, 백엔드 설계/명세 제공)

포함:

UI 컴포넌트·화면 흐름·동작 방식(구현 설명; 코드 제외)

REST API 계약(엔드포인트/요청·응답 스펙; 구현설명)

데이터 모델/ERD 설명(열·관계 설명; SQL 코드 제외)

스프링 부트 기반 백엔드 구현 방안(패키지·계층·보안·배포·테스트 지침)

비기능 요구사항(성능·보안·접근성·모니터링)

제외:

프론트엔드 구현 코드(단, UI 동작·컴포넌트 설명은 포함)

백엔드·DB의 실제 소스코드(설계·예시만 제공)

용어 정의

Player: 게임 플레이어(로그인/비로그인 모두 가능). 

ypingRPG 웹사이트(httpstypingrpg.ne…

Content: 타자용 문장/문단/코드 스니펫 등. 

ypingRPG 웹사이트(httpstypingrpg.ne…

Session: 하나의 플레이(시작→종료).

Score: 세션 결과 (타수, 정확도, WPM, 경험치 등). 

ypingRPG 웹사이트(httpstypingrpg.ne…

Leaderboard: 랭킹(전체/주간/모드별). 

ypingRPG 웹사이트(httpstypingrpg.ne…

1. 기능 요구사항 (요약·정형화)

각 기능은: 목적 → 사용자 스토리 → 세부 요구 → 입력/출력(요약) → 오류/예외 흐름 순으로 기술합니다.

1.1 홈 페이지 (Landing)

목적: 서비스 소개, Start 버튼, 네비게이션(홈/Ranking/Contents), 공지 노출. 

ypingRPG 웹사이트(httpstypingrpg.ne…

사용자 스토리: 비회원·회원 모두 방문 → Start 클릭 → 게스트 혹은 로그인 후 플레이 가능. 

ypingRPG 웹사이트(httpstypingrpg.ne…

세부 요구(요약):

Hero 섹션(대형 CTA: Start)

Beta 공지 모달(닫기·7일간 보지 않기)

Discord 링크/Contact 노출

API(설계): GET /api/content/featured, GET /api/announcements. 

ypingRPG 웹사이트(httpstypingrpg.ne…

1.2 인증

목적: 프로필/점수 저장·랭킹 반영

요구:

이메일+비밀번호 로그인, Google OAuth 지원(토큰 교환).

로그인 유지(토큰/리프레시 토큰).

API(설계): POST /api/auth/login, POST /api/auth/signup, POST /api/auth/oauth/google, GET /api/auth/me. 

ypingRPG 웹사이트(httpstypingrpg.ne…

1.3 게임 플레이(코어)

목적: 타자 연습 + RPG 요소(몬스터, 데미지, 경험치)

주요 흐름:

Start → 모드/콘텐츠 선택 → 세션 생성

타자 화면: 문장 표시, 입력, 실시간 WPM/accuracy 반영

세션 종료 → 결과 요약 → (로그인 시) 서버 전송

세부 규칙:

모드: 시간제한, 무한, 스테이지 등

입력 처리: 정확/오답 하이라이트, 오답 페널티(HP 감소) 등

API(설계): GET /api/contents/{id}/session (문장 목록), POST /api/sessions/{sessionId}/result. 

ypingRPG 웹사이트(httpstypingrpg.ne…

1.4 콘텐츠 관리

목적: 콘텐츠(문장/문단) 분류 및 CRUD (관리자용)

API(설계): GET /api/contents, GET /api/contents/{id}, POST /api/admin/contents, PUT /api/admin/contents/{id}, DELETE /api/admin/contents/{id}. 

ypingRPG 웹사이트(httpstypingrpg.ne…

1.5 랭킹

목적: 경쟁 유도

API(설계): GET /api/leaderboard?mode=&period=&page= , GET /api/user/{userId}/scores. 

ypingRPG 웹사이트(httpstypingrpg.ne…

1.6 공지 / 지원

공지 모달(7일간 보지 않기), footer에 연락처·디스코드 링크. 

ypingRPG 웹사이트(httpstypingrpg.ne…

2. UI 설명(코드 제외 — 컴포넌트/동작·데이터 요구사항 중심)

목표: UI 코드 없이도 UI가 어떻게 동작해야 하는지, 어떤 컴포넌트가 필요하고 어떤 데이터를 주고받는지 명확히 설명합니다(프론트엔드 개발자에게 바로 전달 가능한 수준).

2.1 공통 레이아웃

Header(상단 네비): 로고, 메뉴(Home/Ranking/Contents), 오른쪽 Login/Profile 버튼, Start CTA.

Footer: Contact 이메일, Discord 링크, 저작권/버전 정보.

2.2 페이지별 컴포넌트 & 동작
Home

컴포넌트: Hero, FeaturedContentCard, AnnouncementBar

동작: Hero의 Start 클릭 → /game으로 라우팅(게스트/모드 선택 모달 가능).

데이터: GET /api/content/featured, GET /api/announcements. 

ypingRPG 웹사이트(httpstypingrpg.ne…

Game (핵심 화면)

컴포넌트:

GameHUD — Player HP, Monster HP, Player Level, EXP bar, 현재 Score, WPM.

TypingLine — 현재 문장을 문자 단위로 렌더링(정답 녹색 / 오답 빨강 / 미작성 회색).

InputField — 실제 키 입력 수신(Enter/Space로 단어 제출), 포커스 처리.

PlayerSprite / MonsterSprite — 애니메이션(공격, 피해).

ProgressBar — 문장 진행도.

ResultModal — 세션 종료 시 요약 및 공유 버튼.

상태/데이터:

프론트는 실시간 입력 처리·표시를 담당(높은 반응성 요구).

세션 완료 시 POST /api/sessions/{sessionId}/result 호출(더미 함수/로컬 저장 후 동기화 가능한 구조) — 결과: score, wpm, accuracy, hits, misses, duration, monsters_defeated. 

ypingRPG 웹사이트(httpstypingrpg.ne…

입력 처리 규칙(프론트):

문자 단위 색상 표시, 백스페이스 동작, 오타 페널티(HP 감소), 정답 시 몬스터 데미지, WPM 실시간 산출.

Contents

컴포넌트: ContentsList, ContentCard, 필터(난이도/언어), 검색.

API: GET /api/contents?category=&difficulty=. 

ypingRPG 웹사이트(httpstypingrpg.ne…

Ranking

컴포넌트: LeaderboardTable, 페이징/필터(모드/기간)

데이터: GET /api/leaderboard?mode=&period=&page=. 

ypingRPG 웹사이트(httpstypingrpg.ne…

Settings / Profile

컴포넌트: UserSettingsForm(소리 ON/OFF, 튜토리얼 보기 여부), ProfileSummary(레벨, 누적 경험치)

저장: 로컬 + (로그인시) 서버 동기화(PUT /api/users/{id}/settings 설계)

2.3 접근성 & 반응형

키보드 내비게이션(입력창 자동 포커스), ARIA 태그(타이핑라인, HP bar 등), 색 대비 기준(AA 이상 권장). 

ypingRPG 웹사이트(httpstypingrpg.ne…

3. 데이터 모델(설명형 — 코드 없음)

아래는 ERD의 핵심 엔터티와 주요 속성·관계 설명입니다(개발 시 JPA 엔티티로 바로 매핑 가능하도록 설계 요약).

3.1 User

속성: userId(UUID), email, passwordHash, nickname, avatarUrl, level(INT), exp(INT), isAdmin(BOOLEAN), createdAt, lastLoginAt. 

ypingRPG 웹사이트(httpstypingrpg.ne…

관계: 여러 sessions와 1:N 관계.

3.2 Content

속성: contentId(UUID), title, language, difficulty, tags[], createdBy(userId), createdAt, updatedAt.

관계: Content 1:N Sentences.

3.3 Sentence

속성: sentenceId(UUID), contentId(FK), sequenceIndex(INT), text, length, createdAt.

3.4 Session

속성: sessionId(UUID), userId(nullable for guest), contentId, mode, startedAt, endedAt, totalTimeMs.

3.5 SessionResult

속성: resultId(UUID), sessionId(FK), score, wpm(NUM), accuracy(NUM), hits(INT), misses(INT), monstersDefeated(INT), createdAt.

3.6 Leaderboard (materialized / aggregated view)

속성: userId, resultId, mode, score, rankPeriod(ALL_TIME/WEEKLY/DAILY), recordedAt.

운영: 정기 집계(예: cron job으로 weekly refresh). 

ypingRPG 웹사이트(httpstypingrpg.ne…

3.7 Announcements

속성: announcementId, title, body, startDate, endDate, sticky, createdAt.

4. API 계약(REST — 설계·샘플 JSON, 실제 코드 없음)

각 엔드포인트는 JSON request/response를 사용. 인증 필요 시 Authorization: Bearer <token> 헤더 사용.

4.1 인증

POST /api/auth/login

Request: { "email": "...", "password": "..." }

Response: { "token": "...", "refreshToken": "...", "user": { ... } }

POST /api/auth/oauth/google

Request: { "id_token": "..." }

Response: 동일 형식

4.2 콘텐츠

GET /api/contents?category=&difficulty=

Response: { "contents": [ { "id":"", "title":"", "difficulty":"" , ... } ] }

GET /api/contents/{id}/session

Response: { "sessionId":"", "sentences": ["...", "..."] }

4.3 세션 결과

POST /api/sessions/{sessionId}/result

Request: { "score":1234, "wpm":120.5, "accuracy":98.6, "hits":100, "misses":2, "duration":60000 }

Response: { "ok":true, "resultId":"..." }

4.4 랭킹

GET /api/leaderboard?mode=&period=&page=

Response: { "entries":[ { "rank":1, "userId":"", "nickname":"", "score":1234, "wpm":120.5, "accuracy":98.6 } ], "total": 123 }

4.5 공지

GET /api/announcements

Response: { "announcements":[ { "id":"", "title":"", "body":"", "startDate":"2025-01-01" } ] }

(위 엔드포인트/필드는 원문 설계과 largely 동일함). 

ypingRPG 웹사이트(httpstypingrpg.ne…

5. Spring Boot 적용 방안 (상세)

이 섹션은 스프링 부트로 실제 구현하려는 경우의 구조·권장 라이브러리·패키지 구조·보안·데이터 접근, 배포/모니터링·테스트 전략을 설명합니다(코드 대신 설계·설명).

5.1 아키텍처 개요(권장)

Spring Boot (최신 안정 버전)

Spring Security: JWT 기반 인증 + OAuth2 Client for Google Sign-In

Spring Data JPA(Hibernate) → PostgreSQL (권장)

Flyway 또는 Liquibase: DB 마이그레이션

Spring Web (REST controllers)

Spring Actuator: 헬스체크/메트릭

Scheduler: @Scheduled 혹은 Quartz/Bull(외부)로 leaderboard 집계

Optional: Redis (세션/캐시/leaderboard 집계 가속)

5.2 권장 패키지 구조

com.example.typingrpg

config — security, swagger, datasource

controller — REST controllers (AuthController, ContentController, SessionController, LeaderboardController, AdminController)

service — 비즈니스 로직(인터페이스 + 구현)

dto — 요청/응답 DTO

entity — JPA 엔티티(User, Content, Sentence, Session, SessionResult, Announcement, Leaderboard)

repository — Spring Data JPA repositories

scheduler — 배치/집계 작업

exception — 공통 예외/글로벌 핸들러

util — 공용 유틸(토큰, 변환기)

5.3 보안 설계

인증

이메일/비밀번호: bcrypt(password encoder)로 해시 저장

OAuth: spring-security-oauth2-client로 구글 id_token 검증

JWT 발급(Access token, Refresh token) — Authorization: Bearer

인가

ROLE_USER, ROLE_ADMIN 등 권한 분리(관리자 API 방어)

기타

HTTPS (배포 환경), CORS 설정(프론트 origin 허용)

입력 값 검증(@Valid), CSP 헤더, XSS/CSRF 고려(REST API는 CSRF 제외 가능하나, cookie 사용시 SameSite 설정)

5.4 데이터 접근 전략

엔티티 매핑: User ↔ Session(1:N), Content ↔ Sentence(1:N), Session ↔ SessionResult(1:1)

쿼리 성능:

랭킹 쿼리: 인덱스(leaderboard.score DESC), materialized view 또는 pre-aggregated leaderboards 사용 권장(weekly 집계 등). 

ypingRPG 웹사이트(httpstypingrpg.ne…

페이징: Pageable 활용

트랜잭션: 서비스 레이어에서 @Transactional 적용

5.5 배치 / 집계

Leaderboards 집계

일간/주간 materialized view 또는 별도 leaderboard 테이블에 집계 결과 적재

스케줄: Spring @Scheduled(cron = "...")로 주기 실행(예: 매일 자정, 주간 일요일 23:59)

비동기 작업

결과 제출 시 즉시 집계하지 않고 이벤트 큐(예: Redis Stream / RabbitMQ / Spring Events)로 처리하면 응답 속도 개선

5.6 예외 처리 / 로깅

공통 @ControllerAdvice로 에러 응답 표준화

로깅: SLF4J + Logback

에러 모니터링: Sentry 연동(스프링용 SDK)

5.7 배포·운영

컨테이너화: Dockerfile 작성 → Docker image 빌드

배포 대상: AWS ECS / Cloud Run / Render / Heroku

DB: RDS(Postgres) with automated backups

CI: GitHub Actions — build, test, docker-build, push, deploy

헬스: /actuator/health, 메트릭: /actuator/prometheus (Prometheus + Grafana 권장)

5.8 테스팅(권장)

단위 테스트: JUnit + Mockito

통합 테스트: SpringBootTest + Testcontainers(Postgres)

API 테스트: RestAssured / MockMvc

E2E: Playwright/Cypress(프론트와 통합 시)

6. 운영·비기능 요구사항(요약·중요 항목)

성능: 초기 TTI(데스크톱) < 1.5s, 모바일 < 2.5s; 게임 입력 렌더 60fps 목표(프론트) — 원문 기준. 

ypingRPG 웹사이트(httpstypingrpg.ne…

보안: HTTPS, JWT, bcrypt, OWASP 대책(입력 검증, CSP, SameSite 등). 

ypingRPG 웹사이트(httpstypingrpg.ne…

접근성: 키보드 네비, ARIA, 색 대비 기준 준수. 

ypingRPG 웹사이트(httpstypingrpg.ne…

모니터링: Sentry, Application Metrics(Actuator/Prometheus), Event logging(세션 시작/종료 등). 

ypingRPG 웹사이트(httpstypingrpg.ne…

7. 테스트 계획(요약)

단위/통합: 서비스/리포지토리/JWT 흐름

E2E: Playwright로 게임 시나리오(시작→입력→결과 제출→랭킹 확인) 자동화. 

ypingRPG 웹사이트(httpstypingrpg.ne…

수동 검사 리스트:

로그인(이메일/Google) 정상 동작

게스트 플레이(로그인 안 한 경우) 기록 미저장/동작 확인

네트워크 단절 시 로컬 저장 후 복구(IndexedDB 또는 LocalStorage) 동작 확인. 

ypingRPG 웹사이트(httpstypingrpg.ne…

8. 운영(관리자) 기능(설계)

콘텐츠 CRUD(관리자만 접근), 공지 관리(기간 설정+sticky), 사용자 관리(차단·역할 변경), 세션·랭킹 조회(필터·CSV export). 

ypingRPG 웹사이트(httpstypingrpg.ne…

9. 산출물(개발 시 제공해야 할 자료)

OpenAPI(REST) 명세(YAML 또는 JSON) — 모든 엔드포인트·요청/응답 예시 포함. 

ypingRPG 웹사이트(httpstypingrpg.ne…

데이터베이스 스키마(DDL 설명서) — 마이그레이션 스크립트용 템플릿(설명).

ERD(다이어그램 파일, PNG/SVG). 

ypingRPG 웹사이트(httpstypingrpg.ne…

배포 스크립트(CI config), 테스트 시나리오 목록, 운영 가이드(모니터링·복구 절차).

10. 변경·확장 고려사항(권장)

실시간 기능(WebSocket) — 만약 실시간 다중 세션 동기화가 필요하면 WebSocket(또는 SSE) 도입 고려.

캐시/큐: 랭킹 집계/별도 통계는 Redis 캐시 및 작업 큐(Broker)를 도입하면 확장성/응답성 개선.

멀티 리전/글로벌 배포: 사용자 분포가 글로벌이면 CDN + 리전별 DB 복제 고려.

부록 A — 편집·삭제 내역(원문과 다른 점 요약)

중복·반복 문단 제거: 원문에 반복된 기술·권장 항목(기술스택 항목의 중복 등)을 하나로 통합하여 중복 삭제. 

ypingRPG 웹사이트(httpstypingrpg.ne…

UI 구현 코드(프론트 소스) 제거: 원문에 포함된 대량의 UI 코드/예제(React/Vite 프로젝트 등)는 제거하고, UI 동작·컴포넌트 설명만 남김. (요청대로 “UI 코드 설명 외 코드 삭제”) 

ypingRPG 웹사이트(httpstypingrpg.ne…

스프링 부트 설계 추가: 원문에서 권장한 Node/Express 중심 구조를 삭제하지 않고 보존한 뒤, **Spring Boot 전용 구현 방안(패키지·보안·JPA·스케줄러·배포)**을 상세 추가. (새로 추가한 섹션) 

ypingRPG 웹사이트(httpstypingrpg.ne…

다음 단계(권장)

이 SRS를 Markdown 파일로 저장(원하시면 제가 바로 파일 형태로 만들어 드립니다). 

ypingRPG 웹사이트(httpstypingrpg.ne…

원하시면 OpenAPI 스펙 초안(yaml), JPA 엔티티 설계서(필드/타입 표), **DB 마이그레이션 템플릿(Flyway)**을 코드가 아닌 명세 문서로 생성해 드립니다(요청 시).

프론트엔드 실제 UI 코드(원하시면 Vue 또는 React 중 선택) 또는 스프링 부트 샘플 프로젝트 구조(보일러플레이트)도 별도 요청 가능 — 다만 요청하신 바처럼 UI 코드만 제공하거나 백엔드 코드 없이 설계만 제공 등 원하는 범위를 알려주세요.

원문(참조): 업로드하신 TypingRPG SRS 문서를 기반으로 편집·요약했습니다. 필요하시면 이 문서를 Markdown 파일로 저장하여 제공하거나(다운로드 가능), OpenAPI 초안·JPA 엔티티 명세·DB 마이그레이션 템플릿 등 **구체 문서(코드 없는 명세)**를 바로 만들어 드리겠습니다. 

ypingRPG 웹사이트(httpstypingrpg.ne…

 

ypingRPG 웹사이트(httpstypingrpg.ne…

원하시는 다음 액션을 한 가지만 알려주세요:

Markdown 파일로 저장 (제가 파일로 정리해서 드림)

OpenAPI 초안 생성

JPA 엔티티 명세(컬럼/타입/제약)

배포 시나리오 (Docker + Render/AWS)
원하시는 항목을 하나 골라 주세요 — 바로 생성해 드립니다.