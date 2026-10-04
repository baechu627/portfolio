# 포트폴리오 비밀번호 인증

## 구조

- Nuxt 4.5.2의 SSR, Nitro 서버 API와 서버/라우트 미들웨어를 사용합니다. 추가 라이브러리나 데이터베이스는 없습니다.
- 첫 메인비주얼은 공개됩니다. 비밀번호 입력란과 기존 ENTER PORTFOLIO 버튼으로 인증하며, 인증된 경우에는 입력란 없이 기존 진입 버튼만 표시합니다. 미인증 본문 요청은 서버에서 메인비주얼로 이동합니다.
- 클라이언트의 페이지 이동에도 서버 인증 상태를 확인합니다. 인증 확인 전에는 본문 페이지를 마운트하지 않습니다.
- `/api/auth/password`에서만 서버 환경변수 `PORTFOLIO_PASSWORD`와 입력값을 비교합니다. `runtimeConfig.public`, 클라이언트 상태, localStorage에 비밀번호를 저장하지 않습니다.
- 서명된 세션 쿠키는 HttpOnly, SameSite=Lax, Path=/, 7일 만료로 발급합니다. 프로덕션에서는 Secure도 설정합니다. HTTP로 사용하는 로컬 개발 서버에서는 Secure를 끕니다.
- 세션은 각 요청에서 서버가 서명과 만료를 검증합니다. 서버 인스턴스 메모리에 의존하지 않아 Vercel의 여러 Function 인스턴스에서도 동작합니다. 비밀번호를 바꾸면 기존 쿠키가 무효화됩니다.
- 본문은 인증된 `/api/portfolio` 요청으로만 전달됩니다. `app/data/portfolio.ts`는 서버에서만 값으로 가져오며, 클라이언트에서는 타입으로만 참조합니다. 본문은 공개 JS 번들에 들어가지 않습니다. 공개 `/api/landing`에는 메인비주얼 문구와 이름·직무·지역만 포함되며, 메일 주소와 경력·프로젝트·스킬 상세는 포함하지 않습니다.
- HTML/API 응답은 `private, no-store`로 캐시하지 않습니다. 전체 페이지에 robots 메타와 X-Robots-Tag의 `noindex, nofollow`를 적용하고 robots.txt도 크롤링을 차단합니다.
- 배경 이미지와 아이콘 등 `public/`의 디자인 자산은 공개 상태입니다. 개인정보나 비밀 파일은 public 폴더에 넣지 마세요.

## 로컬 설정

프로젝트 루트에 `.env` 파일을 만들고 다음 한 줄을 설정합니다. 실제 비밀번호는 충분히 긴 무작위 값으로 바꾸세요.

```dotenv
PORTFOLIO_PASSWORD="여기에_길고_고유한_비밀번호를_입력"
```

`openssl rand -hex 32`로 무작위 값을 만들 수 있습니다. `.env`는 Git에서 제외되어 있고, `.env.example`에는 실제 비밀번호가 없습니다. 환경변수를 설정하거나 바꾸면 개발 서버를 재시작합니다. 미설정 상태에서는 인증이 허용되지 않습니다.

```sh
npm run dev
```

## Vercel 설정

1. Project Settings → Environment Variables에서 `PORTFOLIO_PASSWORD`를 등록합니다.
2. Production과 Preview에 모두 설정합니다. 이름에 `NUXT_PUBLIC_`을 붙이지 마세요. 다른 인증용 환경변수는 필요하지 않습니다.
3. Framework Preset은 Nuxt, Build Command는 `npm run build`를 사용합니다. Output Directory는 프레임워크 기본값으로 둡니다.
4. 환경변수 추가/변경 후 Redeploy합니다.

Hobby 플랜의 Node.js Functions를 사용하는 방식입니다. `npm run generate`나 정적 파일만 업로드하는 배포는 서버 인증 API가 없으므로 사용하지 마세요. Vercel에서는 Nuxt의 서버 API와 서버 미들웨어가 기본적으로 서버 렌더링 Function으로 배포됩니다. [Vercel Nuxt 문서](https://vercel.com/docs/frameworks/full-stack/nuxt)

## 테스트

### 로컬 브라우저

1. 시크릿 창에서 `/`와 `/portfolio#projects`를 각각 직접 열어 메인비주얼과 비밀번호 입력란만 보이는지 확인합니다.
2. 비밀번호 입력 전에는 본문이 표시되지 않는지 확인합니다.
3. 잘못된 비밀번호로 Enter를 눌러 오류 표시를 확인합니다.
4. 정상 비밀번호를 Enter로 제출하고 요청 중 입력/버튼이 비활성화되는지 확인합니다.
5. 인증 후 원래 페이지로 돌아오는지, 새로고침과 새 탭에서도 유지되는지 확인합니다.
6. DevTools → Application → Cookies에서 `portfolio_session`의 HttpOnly, SameSite, 만료를 확인합니다. HTTP 개발 서버에서는 Secure가 없는 것이 정상입니다.
7. 쿠키를 삭제하면 다시 잠기는지 확인합니다. 미인증 `/api/portfolio` 요청은 401이어야 합니다.
8. 모바일 화면에서 입력창과 버튼이 잘리지 않는지 확인합니다.

### 자동 테스트

Node.js 22.6 이상에서 실행합니다. 테스트는 실제 비밀번호 대신 임시 무작위 비밀번호로 별도 로컬 서버를 실행합니다.

```sh
npm run build
npm run test:auth
```

비밀번호 비교, 세션 만료/변조/비밀번호 변경, 미설정 시 차단, 모든 페이지 직접 접근, 본문 API 접근 제어, 쿠키 옵션, noindex, 캐시 방지, 공개 JS 번들 내 비밀번호/본문 미포함을 검증합니다.

### Vercel 배포 후

위 브라우저 테스트를 HTTPS 배포 URL에서 반복합니다. 이때 쿠키에 Secure가 있어야 합니다. 브라우저를 닫았다가 다시 열어도 유효한 쿠키가 있으면 입력을 다시 요구하지 않습니다. 환경변수 변경 후 Redeploy하면 이전 쿠키로 접근할 수 없어야 합니다. Preview와 Production은 도메인이 달라 각각 인증해야 합니다.

공유 비밀번호 방식이므로 사용자별 권한이나 사용자별 세션 해제는 제공하지 않습니다. 충분히 긴 비밀번호를 사용하고 공개하지 마세요. 본 구현에는 분산 로그인 시도 제한이 포함되어 있지 않습니다. 더 강한 접근 통제가 필요하면 별도 계정 인증이나 플랫폼 보안 기능을 추가해야 합니다.

## 추가 파일

- `.env.example`
- `server/utils/portfolioAuth.ts`: 비밀번호/서명 세션 검증, 쿠키 발급
- `server/middleware/portfolio-auth.ts`: 서버 접근 제어, 응답 헤더
- `server/api/auth/password.post.ts`, `server/api/auth/session.get.ts`: 로그인/인증 상태 API
- `server/api/portfolio.get.ts`: 인증된 본문 데이터 API
- `app/middleware/auth.global.ts`: 라우트 접근 제어와 본문 로딩
- `app/composables/usePortfolioContent.ts`: 서버에서 받은 본문 사용
- `app/utils/safePortfolioRedirect.ts`: 안전한 내부 이동 주소 검증
- `server/api/landing.get.ts`, `app/composables/useLandingContent.ts`: 공개 메인비주얼 데이터
- `tests/portfolio-auth.test.mjs`: 인증 자동 테스트
- `docs/password-auth.md`: 설정/배포/테스트 안내

## 수정 파일

- `app/app.vue`: 인증 전 본문 렌더링 차단과 robots 메타
- `app/assets/css/main.css`: 메인비주얼 비밀번호 입력란과 에러 메시지 스타일
- `nuxt.config.ts`: 보호 페이지 prerender 방지, 프로덕션 개발 도구 비활성화
- `.gitignore`: Vercel 빌드 산출물 제외
- `package.json`: 테스트 명령
- `public/robots.txt`: 크롤링 차단
- `app/data/portfolio.ts`: PC 전용 About 개행 기준을 서버 콘텐츠 데이터로 이동
- `app/pages/index.vue`, `app/pages/portfolio.vue`: 서버에서 받은 본문 사용
- `app/components/AboutSection.vue`, `AppFooter.vue`, `AppHeader.vue`, `ContactSection.vue`, `DetailModal.vue`, `ExperienceSection.vue`, `LanguageSwitcher.vue`, `MainVisual.vue`, `ProjectsSection.vue`, `SectionRail.vue`, `SkillsSection.vue`: 직접 데이터 import를 공통 컴포저블로 교체. MainVisual에는 비밀번호 입력 폼을 추가하고, 나머지 기존 템플릿/디자인은 유지
