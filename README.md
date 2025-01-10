## OTT Search

![thumb_ott-search](https://github.com/user-attachments/assets/099ac2ab-9542-4715-ad1e-64e62fba26a3)

**TMDB API를 활용한, 미디어 콘텐츠의 Provider를 알려주는 웹 페이지**

- **작업기간**: 2024.10.01 ~ 2024.10.11
- **stack**: NextJS, Typescript, React-Query, Module CSS
- **깃허브**: https://github.com/inhye94/ott-search
- **홈페이지**: https://ott-search.vercel.app/

## 개발 배경

최근 제 취미는 다양한 OTT 플랫폼에서 콘텐츠를 시청하는 것입니다. 하지만 각 앱을 일일이 열어 원하는 콘텐츠를 검색하는 과정에서 불편함을 느꼈습니다. 이러한 비효율성을 해소하기 위해, **사용자가 원하는 콘텐츠를 한 곳에서 검색하고 제공 플랫폼을 바로 확인할 수 있는 웹 페이지**를 개발했습니다. 이 프로젝트는 **사용자 경험을 개선**하고 콘텐츠 검색 과정을 더 효율적으로 만드는 데 중점을 두었습니다.

## 작업 사항

![ott-search-detail-desktop-after](https://github.com/user-attachments/assets/322e8e8b-8ebe-433a-9f77-47dda84ab9bd)

- OTT에 직접 들어가서 검색하는 것이 불편하여 검색 페이지 개발
- NextJS 기반의 **SSR 웹 애플리케이션** 구축
- **검색 최적화** 구현
- 구글 **lighthouse**로 성능 측정, 성능 개선

## 작업 화면

| 검색 페이지                                                                                                |
| ---------------------------------------------------------------------------------------------------------- |
| ![검색 페이지](https://github.com/user-attachments/assets/f72537ae-3e55-40d3-a327-63984dcee7b1)            |
| - 검색 결과/건 출력<br/> - 검색 결과 없으면 empty 메세지 출력<br/> - throttle과 debounce로 API 호출 최적화 |

| 상세 페이지                                                                                     |
| ----------------------------------------------------------------------------------------------- |
| ![상세 페이지](https://github.com/user-attachments/assets/5f6ff699-7ddc-4234-b227-c7198cd18d85) |
| - Provider 출력<br/> - 미디어 콘텐츠 상세 정보 출력<br/> - 공식 홈페이지 링크 포함              |

| 추천 페이지                                                                                     |
| ----------------------------------------------------------------------------------------------- |
| ![추천 페이지](https://github.com/user-attachments/assets/a25b261e-df78-4377-bbe0-13fe0165abd0) |
| - 인기 영화 추천 리스트 출력                                                                    |

| About 페이지                                                                                     |
| ------------------------------------------------------------------------------------------------ |
| ![About 페이지](https://github.com/user-attachments/assets/7269bb2a-bf1d-418f-8342-66cf7b8710ca) |
| - 개발자 소개 및 TMI<br/> - 깃허브 링크 포함                                                     |

## 트러블 슈팅

### 검색 최적화

- **[문제점]** **검색 기능 최적화** 과정에서 `debounce`를 적용해 이벤트 호출 빈도를 줄이고자 했지만, 컴포넌트가 리렌더링될 때마다 새로운 `debounce` 함수가 생성되어, 기존 **`debounce` 함수와 병렬로 실행**되는 문제를 겪었습니다. (입력창에 “abc”를 입력했을 때 “a”, “ab”, “abc”에 대해 각각 API 호출이 발생)
- **[해결]** **함수의 참조를 고정하기 위해 `useCallback`을 활용**했습니다. 그 결과, 함수가 리렌더링 시에도 동일한 참조를 유지하여 debounce된 API 호출이 실행되었습니다.
- **[성과]** API 호출 횟수를 줄여 **네트워크 비용을 절감**. `useCallback`과 `debounce`의 조합을 통해 **상태 의존적 함수를 효율적으로 관리하는 방법을 학습**.

[📎 search-form 컴포넌트](https://github.com/inhye94/ott-search/blob/main/src/components/search-bar/search-form/search-form.tsx)

```tsx
// NOTE: src/components/search-bar/search-form/search-form.tsx
const SearchForm = ({ onChange, onActive }: SearchFormPropsType) => {
  const [text, setText] = useState<string>("");

  const debounceUpdate = useCallback(
    debounce((text) => {
      onChange(text.trim()); // 재사용 가능하게 이벤트 주입
    }, 500),
    []
  );

  // ~ 다른 코드들 ~
};
```

### Props로 전달하는 데이터 타입 안정성 개선

- **[문제점]** 재사용 가능한 컴포넌트에 **API Response 데이터를 Props로 전달**할 때, **API 응답 데이터의 구조가 달라서** 데이터 구조를 일일이 검사하거나 변환해야 했기 때문에 컴포넌트 재사용성과 유지보수성이 저하되는 문제를 겪었습니다.
- **[해결]** **제네릭(Generic)** 타입과 **`extends`**를 활용해 Props에 전달되는 데이터 타입을 동적으로 정의해 타입스크립트의 **조건부 타입**을 활용해 데이터 구조가 달라질 때도 컴파일 단계에서 타입 안정성을 보장하도록 구현했습니다.
- **[성과]** 컴파일 단계에서 잘못된 데이터 구조를 감지해 **타입 안정성 확보**. 제네릭 타입을 통해 다양한 데이터 구조를 사용하는 **컴포넌트를 반복적으로 재활용** 가능.

[📎 contents-info 컴포넌트](<https://github.com/inhye94/ott-search/blob/4f57b69e4a3e020b698b83616ca669edd1950347/app/(contents)/%5Bid%5D/components/contents-info/contents-info.tsx#L11>)

```ts
// NOTE: src/model/contents.ts

// 영화 데이터
interface MovieInfoResponseType {
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: CollectionType[] | null;
  budget?: number;
  genres: GenreType[] | [];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[] | [];
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies?: ProductionCompaniesType[] | [];
  production_countries?: ProductionCountriesType[] | [];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: LanguageType[] | [];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  release_year?: string;
  media_type?: "영화" | "TV";
}

// TV 데이터
interface TvInfoResponseType extends MovieInfoResponseType {
  created_by: CreatedByType[] | [];
  episode_run_time: [];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeType;
  name: string;
  next_episode_to_air: EpisodeType | null;
  networks: NetworksType[] | [];
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  type: string;
  seasons: SeasonType[] | [];
}
```

## 배운 점

Next.js를 처음 사용하면서 파일 시스템 기반의 App Routing이 제공하는 간결함과 편리함을 경험할 수 있었습니다. 별도의 router 설정 없이 동작하고, URL params를 util 함수나 hook 없이 바로 활용할 수 있다는 점은 개발 효율성을 크게 높여주었습니다. 이를 통해 Next.js의 생산성 향상에 큰 매력을 느꼈습니다.

검색 최적화 과정에서 debounce 함수가 병렬 실행되는 문제를 겪었으나, useCallback을 활용하여 함수의 참조가 리렌더링 시에도 유지되도록 함으로써 문제를 해결할 수 있었습니다. 이를 통해 리액트 환경에서 debounce와 같은 상태 의존적 함수의 안정적인 동작을 보장하는 방법을 배울 수 있었습니다.

## 실행방법

```bash
# Install JavaScript Packages
yarn install

# Run Frontend Server
yarn dev
```
