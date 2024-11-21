## OTT Search

<img width="500" alt="스크린샷 2024-11-20 오후 2 54 22" src="https://github.com/user-attachments/assets/41c3e451-9600-42fb-8d13-2ea65fbd9d45">

## 📎 링크

- 깃허브: https://github.com/DuetoPark/ott-search
- 홈페이지: https://ott-search.vercel.app/

## 👀 개요

**TMDB API를 활용한, 콘텐츠의 Provider를 알려주는 웹 페이지**

- 규모: 개인 프로젝트 (2024.10.01 ~ 2024.10.11)
- OTT에 직접 들어가서 검색하는 것이 불편하여 검색 페이지 개발
- NextJS 기반의 **SSR 웹 애플리케이션** 구축
- **검색 최적화** 구현
- 구글 **lighthouse**로 성능 측정, 성능 개선

### 기술 스택

```json
{
  "상태관리": "TanStack Query",
  "라우팅": "NextJS App router",
  "스타일링": ["module css", "classnames"],
  "HTTP 클라이언트": "Axios",
  "코드 품질 관리": ["ESLint", "TypeScript ESLint"],
  "패키지 매니저": "yarn berry"
}
```

## 🤔 개발 배경

최근 제 취미는 다양한 OTT 플랫폼에서 콘텐츠를 시청하는 것입니다. 하지만 각 앱을 일일이 열어 원하는 콘텐츠를 검색하는 과정에서 불편함을 느꼈습니다. 이러한 비효율성을 해소하기 위해, 사용자가 원하는 콘텐츠를 한 곳에서 검색하고 제공 플랫폼을 바로 확인할 수 있는 웹 페이지를 개발했습니다. 이 프로젝트는 사용자 경험을 개선하고 콘텐츠 검색 과정을 더 효율적으로 만드는 데 중점을 두었습니다.

## 📖 배운 점

Next.js를 처음 사용하면서 파일 시스템 기반의 App Routing이 제공하는 간결함과 편리함을 경험할 수 있었습니다. 별도의 router 설정 없이 동작하고, URL params를 util 함수나 hook 없이 바로 활용할 수 있다는 점은 개발 효율성을 크게 높여주었습니다. 이를 통해 Next.js의 생산성 향상에 큰 매력을 느꼈습니다.

검색 최적화 과정에서 debounce 함수가 병렬 실행되는 문제를 겪었으나, useCallback을 활용하여 함수의 참조가 리렌더링 시에도 유지되도록 함으로써 문제를 해결할 수 있었습니다. 이를 통해 리액트 환경에서 debounce와 같은 상태 의존적 함수의 안정적인 동작을 보장하는 방법을 배울 수 있었습니다.

## 🏃‍♂️ 실행방법

```bash
# Install JavaScript Packages
yarn install

# Run Frontend Server
yarn dev
```
