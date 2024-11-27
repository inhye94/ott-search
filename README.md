## OTT Search

<img width="500" alt="스크린샷 2024-11-20 오후 2 54 22" src="https://github.com/user-attachments/assets/41c3e451-9600-42fb-8d13-2ea65fbd9d45">

## 📎 링크

- 깃허브: https://github.com/inhye94/ott-search
- 홈페이지: https://ott-search.vercel.app/

## 👀 개요

**TMDB API를 활용한, 콘텐츠의 Provider를 알려주는 웹 페이지**

- 규모: 개인 프로젝트 (2024.10.01 ~ 2024.10.11)
- OTT에 직접 들어가서 검색하는 것이 불편하여 검색 페이지 개발
- NextJS 기반의 **SSR 웹 애플리케이션** 구축
- **검색 최적화** 구현
- 구글 **lighthouse**로 성능 측정, 성능 개선

## 🤔 개발 배경

최근 제 취미는 다양한 OTT 플랫폼에서 콘텐츠를 시청하는 것입니다. 하지만 각 앱을 일일이 열어 원하는 콘텐츠를 검색하는 과정에서 불편함을 느꼈습니다. 이러한 비효율성을 해소하기 위해, 사용자가 원하는 콘텐츠를 한 곳에서 검색하고 제공 플랫폼을 바로 확인할 수 있는 웹 페이지를 개발했습니다. 이 프로젝트는 사용자 경험을 개선하고 콘텐츠 검색 과정을 더 효율적으로 만드는 데 중점을 두었습니다.

## 🛠️ 기술 스택

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

## 💫 트러블 슈팅

### 검색 최적화

- **[문제점]** **검색 기능 최적화** 과정에서 `debounce`를 적용해 이벤트 호출 빈도를 줄이고자 했지만, 컴포넌트가 리렌더링될 때마다 새로운 `debounce` 함수가 생성되어, 기존 **`debounce` 함수와 병렬로 실행**되는 문제를 겪었습니다. (입력창에 “abc”를 입력했을 때 “a”, “ab”, “abc”에 대해 각각 API 호출이 발생)
- **[해결]** **함수의 참조를 고정하기 위해 `useCallback`을 활용**했습니다. 그 결과, 함수가 리렌더링 시에도 동일한 참조를 유지하여 debounce된 API 호출이 실행되었습니다.
- **[성과]** API 호출 횟수를 줄여 **네트워크 비용을 절감**. `useCallback`과 `debounce`의 조합을 통해 **상태 의존적 함수를 효율적으로 관리하는 방법을 학습**.

<details>
<summary>✅ 예시 코드</summary>

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

</details>

### Props로 전달하는 데이터 타입 안정성 개선

- **[문제점]** 재사용 가능한 컴포넌트에 **API Response 데이터를 Props로 전달**할 때, **API 응답 데이터의 구조가 달라서** 데이터 구조를 일일이 검사하거나 변환해야 했기 때문에 컴포넌트 재사용성과 유지보수성이 저하되는 문제를 겪었습니다.
- **[해결]** **제네릭(Generic)** 타입과 **`extends`**를 활용해 Props에 전달되는 데이터 타입을 동적으로 정의해 타입스크립트의 **조건부 타입**을 활용해 데이터 구조가 달라질 때도 컴파일 단계에서 타입 안정성을 보장하도록 구현했습니다.
- **[성과]** 컴파일 단계에서 잘못된 데이터 구조를 감지해 **타입 안정성 확보**. 제네릭 타입을 통해 다양한 데이터 구조를 사용하는 **컴포넌트를 반복적으로 재활용** 가능.

<details>
<summary>✅ 예시 코드</summary>

[📎 contents-info 컴포넌트](<https://github.com/inhye94/ott-search/blob/4f57b69e4a3e020b698b83616ca669edd1950347/app/(contents)/%5Bid%5D/components/contents-info/contents-info.tsx#L11>)

```tsx
// NOTE: app/(contents)/%5Bid%5D/components/contents-info/contents-info.tsx

// 조건에 따라 데이터형 선택
type MediaType = "영화" | "TV";

type ContentInfoType<T extends MediaType> = T extends "영화"
  ? MovieInfoResponseType
  : TvInfoResponseType;

interface ContentsInfoPropsType<T extends MediaType> {
  info: ContentInfoType<T>;
  media: T;
}

const ContentsInfo = <T extends MediaType>({
  info,
  media,
}: ContentsInfoPropsType<T>) => {
  return (
    <>
      <img
        className={styles.backdrop}
        src={info.backdrop_path}
        alt={info.title}
      />

      <div className={styles.info}>
        <div className={styles.left}>
          <img src={info.poster_path} alt={info.title} />
        </div>

        <div className={styles.right}>
          <div className={styles["tag-group"]}>
            <Tag>{info.media_type}</Tag>
            {info.adult && <Tag color="red">청소년 관람불가</Tag>}
          </div>

          <h5 className={styles.name}>{info.title}</h5>

          <p className={styles.release}>
            <span>{info.original_title}</span>
            <span>{info.release_year}</span>
            {"number_of_episodes" in info && info.number_of_episodes && (
              <span>총 {info.number_of_episodes}편</span>
            )}
            <span>
              <span aria-label="평점">⭐️ </span>
              {info.vote_average}
            </span>
          </p>

          <div className={styles["tag-group"]}>
            {info.genres.map((genre) => (
              <Tag key={genre.id} color="gray">
                {genre.name}
              </Tag>
            ))}
          </div>

          <p className={styles.overview}>{info.overview}</p>

          {/* =========== 데이터형이 다른 부분 =========== */}
          {info.tagline && <p className={styles.tagline}>{info.tagline}</p>}

          {"networks" in info && info.networks && (
            <div className={styles.streaming}>
              스트리밍
              {info.networks.map((streaming) => (
                <img
                  key={streaming.id}
                  src={streaming.logo_path}
                  alt={streaming.name}
                />
              ))}
            </div>
          )}

          {info.homepage && (
            <Tag tag="link" href={info.homepage} className={styles.link}>
              홈페이지 &rarr;
            </Tag>
          )}
          {/* =========== 데이터형이 다른 부분 =========== */}

          <p className={styles.from}>
            <strong>
              이 데이터는 JustWatch에서 제공받았습니다. | Data provided by
              JustWatch.
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};
```

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

</details>

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
