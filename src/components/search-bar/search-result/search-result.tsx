import styles from "./search-result.module.css";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../api/tmdbDATA/client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const getSearchResult = async (keyword: string) => {
  return axiosInstance
    .get(`search/multi`, {
      params: {
        query: keyword,
        include_adult: false,
        language: "ko",
        page: 1,
      },
    })
    .then((res) => {
      const { method, url } = res.config;
      const { status } = res;

      if (status !== 200) {
        throw Error(
          `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
        );
      }

      return res.data.results;
    })
    .catch((error) => console.log(error.message));
};

const SearchResult = ({ keyword, isActive }) => {
  const router = useRouter();

  const {
    isPending,
    isSuccess,
    data: results,
  } = useQuery({
    queryKey: ["search", keyword],
    queryFn: async () => {
      return getSearchResult(keyword);
    },
  });

  const moveToDetail = useCallback((id: number) => {
    router.push(`/movies/${id}?tab=videos`);
  }, []);

  if ((!isActive && results?.length === 0) || !results) return;

  return (
    <ul className={styles.list}>
      {!keyword && <div className={styles.empty}>검색어를 입력해주세요.</div>}

      {keyword && isPending && (
        <div className={styles.empty}>
          <span aria-hidden="true">🔍</span> "{keyword}"에 대해 검색 중
        </div>
      )}

      {keyword && isSuccess && (
        <div className={styles.summary}>
          <p>
            <span aria-hidden="true">🔍</span> "{keyword}"에 대한 검색 결과
          </p>
          <p>총 {results.length}건</p>
        </div>
      )}

      {results &&
        results.map((result) => (
          <li key={result.id} className={styles.item}>
            <article
              className={styles.card}
              onClick={() => moveToDetail(result.id)}
            >
              <div className={styles.left}>
                {result.poster_path || result.profile_path ? (
                  <img
                    src={
                      process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
                      (result.poster_path || result.profile_path)
                    }
                    alt={result.name}
                  />
                ) : (
                  <div>no poster</div>
                )}
              </div>
              <div className={styles.right}>
                <h4>{result.name || result.title}</h4>
                <h5>{result.original_name || result.original_title}</h5>
                <p>
                  <span>{getMedia(result.media_type)}</span>
                  <span>
                    {getYear(result.first_air_date || result.release_date)}
                    {getWork(result.known_for)}
                  </span>
                </p>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
};

const getYear = (date) => {
  if (!date) return;

  return date.split("-")[0];
};

const getMedia = (media) => {
  const mediaObject = {
    tv: "tv",
    movie: "영화",
    person: "인물",
  };

  return mediaObject[media];
};

const getWork = (works) => {
  if (!works) return;

  return `대표작 - ${works.map((work) => work.title || work.name).join(", ")}`;
};

export default SearchResult;
