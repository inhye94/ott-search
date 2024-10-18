# **NextJS와 the movie DB API로 만든 페이지**

## 요약

- 시작: 2024.10.01 ~ 2024.10.11
- 규모: 개인 프로젝트
- 목적
  - client 컴포넌트와 server 컴포넌트를 구분해서 페이지를 설계하고, 검색 최적화를 구현하자
- 프로젝트 기술스택
  - `React`: 컴포넌트 단위로 코드를 작성하고, 재사용 가능한 컴포넌트를 제작하기 위함
  - `Typescript`: 개발 단계에서 오류를 발견하고, 타입 오류를 줄이기 위함
  - `module css`: global classname으로 인한 스타일 간섭을 줄이기 위함

### 개발 환경

- 초기세팅
  - 수동으로 진행
  - 이유: 처음이니까
- 사용 언어와 컴파일러
  - `Javascript & Typescript`
  - 이유: ts의 자동 타입 유추 기능과 vscode의 인텔리전스를 사용하여 안정적으로 코드를 구현하기 위함
- 패키지 매니저
  - `yarn`
  - 이유: log 메세지가 직관적이고 npm보다 빠르기 때문에 사용
- 라우팅
  - app routing
  - 이유: 도메인이 폴더 구조에 반영되어있어, 다른 개발자가 작업할 때 폴더의 위치를 쉽게 유추하도록 app routing을 선택함

## 1. 폴더 구조

```
public
 ┣ images
 ┗ styles
src
 ┣ api
 ┣ components
 ┣ model
 ┗ utils
app
 ┣ (contents)
 ┣ (home)
 ┣ about-us
 ┣ popular
 ┣ constants.ts
 ┣ layout.tsx
 ┗ not-found.tsx
```

- public: Assets 저장
- src: UI와 api 등 주로 작업하는 공간
- app: app router

root에 폴더가 많으면 너무 헷갈려서 public, src, app만 두기로 했다.

수정이 적은 assets는 public에 두었다. NextJS 프레임워크를 사용하지만, 어쨌든 react로 프로젝트를 구현하기 때문에 익숙한 구조를 따르기 위함이다. 혹시 몰라 확인해보니, NextJS 공식 홈페이지에서도 public 폴더를 만들어서 assets를 관리하는 것울 권고한다.

atomit UI, api, 그 외 로직들은 src에 두었다. NextJS의 공식 홈페이지에 갔더니 src 폴더는 "Optional application source folder"라고 한다. src 안에 app 폴더를 두고 app router 기능을 사용하려면, 별도의 config 작업이 필요하다.

app 폴더는 app router를 담당하는 폴더다. Next.js 13에서 기본적으로 권장되는 방식이라 추가 설정은 없다. app router를 사용한다는 것이 직관적으로 느껴져서 app 폴더를 root에 빼놓았다.

모듈화를 강화하고 정돈된 폴더구조를 사용하려면, app 폴더를 root에서 src 폴더로 옮겨야 한다. 하지만 이 프로젝트는 소규모이므로 app 폴더를 root에 놓기로 결정했다.

### app

app router가 이루어지는 폴더이다. NextJS의 규칙을 그대로 따라, **파일 시스템**에 의해서 **폴더구조 = 도메인 구조**가 된다.

- app/about-us/page.tsx ➡️ `도메인/about-us`
- app/(contents)/[id]/movie/page.tsx ➡️ `도메인/533533/movie`
- app/popular/page.tsx ➡️ `도메인/popular`

아토믹 UI나, layout UI를 제외한 모든 UI는 페이지 마다 가지고 있는 components 폴더 내부에서 관리한다. 컴포넌트는 컴포넌트, 스타일, 프리티어로 구성된다.

**예시**

```
(contents)
 ┗ [id]
   ┗ components
     ┣ contents-info
     ┃ ┣ contents-info.module.css
     ┃ ┣ contents-info.tsx
     ┃ ┗ index.tsx
     ┗ contents-provider
       ┣ contents-provider.module.css
       ┣ contents-provider.tsx
       ┗ index.tsx
```

### public

- Assets 저장
- image, font, base styles

#### 폴더 구조

```
public
 ┣ images
 ┗ styles
   ┣ base
   ┃ ┣ global.css
   ┃ ┣ normalize.css
   ┃ ┗ reset.css
   ┣ constants
   ┃ ┗ colors.css
   ┗ main.css
```

- images: 아이콘, 이미지를 저장
- styles
  - base: **스타일 초기화**, 글로벌 스타일 선언
  - constants: **범용으로 사용되는 스타일 변수**
  - main.css: styles 폴더 내부 파일을 import하는 파일

### src

#### 폴더 구조

```
src
 ┣ api
 ┣ components
 ┣ model
 ┗ utils
```

#### api

특정 기능을 파일 단위로 나누어 관리하는 폴더이다. **코드의 응집도**를 높이기 위해 폴더를 따로 만들어서 코드를 관리한다.

네이밍 컨벤션은 다음과 같다.

- 폴더명: 기능을 대표하는 단어
- 파일명: useXXX.ts

**예시**

```
api
 ┗ tmdbDATA
   ┣ client.tsx
   ┗ useTMDB.tsx
```

#### components

아토믹 UI, layout UI를 관리한다.  
대부분의 UI는 내부에 로직이 없어서 presentational한 특징을 가진다.

내부 구조는 app 폴더 안의 components 폴더 구조와 동일하다.

#### model

type을 정리한 폴더이다.

#### utils

자주 쓰이는 계산 함수를 모아둔 폴더이다.

## 2. 검색 최적화

- 페이지: Home
- 컴포넌트: SearchBar
- 상황: input 입력할 때

### 구조

```
SearchBar
ㄴ SearchForm
ㄴ SearchResult
```

- SearchBar
  - state: keyword
- SearchForm
  - props로 setKeyword를 전달받음
  - onInput 이벤트에서 setKeyword를 실행 > keyword 갱신
- SearchResult
  - props로 keyword를 전달받음
  - keyword 갱신 > UI 리렌더 > API를 호출

### As-is

- 내부 state가 갱신될 때마다 UI 리렌더
- 검색 키워드도 함께 갱신 > API 호출이 연속적으로 호출 > 네트워크 트래픽 증가

### To-be

- 내부 state 갱신에 따른 UI 리렌더 유지
- 입력이 완료되면 검색 키워드가 한 번 갱신 > API를 한 번 호출

### 해결

Form 이벤트에 **`debounce`**, **`useCallback`** 적용해서 검색 최적화를 구현했다.

debounce를 통해 이벤트를 그룹화하여, 설정한 500ms 내에 연이어서 이벤트 함수가 호출되면 마지막 함수만 실행된다.  
그리고 useCallback을 사용해, 리렌더될 때마다 debounce가 생성되어 병렬로 실행되는 것을 방지했다.

```tsx
const SearchForm = ({ onChange, onActive }: SearchFormPropsType) => {
  const input = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");

  const debounceUpdate = useCallback(
    debounce((text) => {
      onChange(text.trim());
    }, 500),
    []
  );

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        ref={input}
        className={styles.input}
        type="text"
        placeholder="영화, 드라마 검색"
        onInput={() => {
          setText(input.current.value); // 🔥 UI 리렌더
          debounceUpdate(input.current.value); // 🔥 검색 키워드 업데이트
        }}
        onFocus={() => onActive(true)}
        onBlur={() => onActive(false)}
        value={text}
      />
    </form>
  );
};
```

## 3. API Error 핸들링과 Interceptor

### As-is

- 에러 로그 남기지 않아 대응이 어려움

### To-be

- request, response, error 로깅
- 로깅: 유형, 메소드, URL, status 코드, statusText

### 해결

- Axios의 Instance를 사용해서 baseURL과 공통된 params를 전달
- Interceptor 사용해 config에서 method, url을 꺼내어 로깅에 사용

```ts
// NOTE: instance 생성
const axiosInstance = axios.create({
  baseURL: "https://...",
  params: {
    // 공통된 params 선언
  },
});

// NOTE: request
const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method, url } = config;
  console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

  return config;
};

// NOTE: response
const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { method, url } = res.config;
  const { status } = res;

  if (status !== 200) {
    console.log(
      `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
    );
  }

  console.log(
    `🛬 [API - RESPONSE] ${method?.toUpperCase()} ${url} | status: ${status}`
  );

  return res;
};

// NOTE: error
const onError = (error: AxiosError): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    const { status } = error;

    if (error.response) {
      const { status, statusText } = error.response;

      console.log(
        `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status} ${statusText}`
      );
    } else {
      console.log(
        `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
      );
    }
  }

  return Promise.reject(error);
};

// NOTE: interceptor 선언
axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse, onError);
```

## 4. Response Type

- 상황: Fetching한 데이터에 type을 지정하지않음

### As-is

- typescript 컴파일 넘어감 > 개발과정에서 에러 놓침 > client 화면에서 에러 발견

### To-be

- Response type을 선언하고, 개발 중에 에러를 캐치

### 해결

- Axios Response type에 제네릭 선언
  - 이유: API 마다 전달받는 data type이 다름
  - 사용: API 호출할 때 data type 전달

```ts
// NOTE: src/model/contents.ts

export type InstanceType = <T>(url: string, options?: {}) => Promise<T>;

export type PopularType = (params?: {}) => Promise<PopularItem[]>;

interface PopularItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[] | [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PopularResponseType {
  page: number;
  results: PopularItem[];
  total_page: number;
  total_results: number;
}
```

```ts
// NOTE: src/api/tmdbDATA/useTMDB.tsx
const getContentsData: InstanceType = async (url, options) => {
  return axiosInstance
    .get(url, { params: options })
    .then((res) => {
      const { method, url } = res.config;
      const { status } = res;

      if (status !== 200) {
        throw Error(
          `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
        );
      }

      return res.data;
    })
    .catch((error) => console.error(error.message));
};

const getPopularMovies: PopularType = async (params) => {
  return getContentsData<PopularResponseType>("movie/popular", params)
    .then((data) => data.results)
    .then((data) =>
      data.map((item) => ({
        ...item,
        poster_path: fullImagePath(item.poster_path),
      }))
    );
};
```

## 5. 조건부 Type

- 페이지: (contents)/[id]/movie
- 컴포넌트: ContentsInfo
- 상황: 컴포넌트를 재사용하는데 props로 전달받은 데이터 type이 서로 다를 때

### 구조

```
MoviePage
ㄴ ContentsInfo

TvPage
ㄴ ContentsInfo
```

- MoviePage
  - 영화 데이터를 fetching
- TvPage
  - TV 데이터를 fetching
- ContentsInfo
  - props: info, media
    - media props는 'TV' 또는 '영화'
    - info props는 API로 전달받은 data
  - 영화 데이터 구성 !== TV 데이터 구성

### As-is

- 유니온 타입 지정 > 하나의 타입이 무시됨

### To-be

- 조건부 타입 지정 > 미디어 타입에 따라 조건에 맞는 타입 적용

### 해결

- extends와 삼항 연산자를 사용해서 조건부 타입 구현

```tsx
// NOTE: app/(contents)/[id]/components/contents-info/contents-info.tsx

// NOTE: MediaType 타입 제한 ('영화' | 'TV')
type MediaType = MovieInfoResponseType["media_type"];

// NOTE: MediaType 값에 따라 ContentsInfoPropsType을 결정
type ContentInfoType<T extends MediaType> = T extends "영화"
  ? MovieInfoResponseType
  : TvInfoResponseType;

// NOTE: Props 타입 선언
interface ContentsInfoPropsType<T extends MediaType> {
  info: ContentInfoType<T>;
  media: T;
}

const ContentsInfo = <T extends MediaType>({
  info,
  media,
}: ContentsInfoPropsType<T>) => {
  return (
    // ... UI 구성
  );
};
```

<img width="602" alt="스크린샷 2024-10-18 오후 1 44 46" src="https://github.com/user-attachments/assets/bef2c91f-233f-4277-87cb-df6d9a4d71d6">

<img width="571" alt="스크린샷 2024-10-18 오후 1 45 02" src="https://github.com/user-attachments/assets/e8a7c17e-9f6c-4910-b31f-5dfce75febc1">

