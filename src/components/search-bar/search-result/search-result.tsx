import styles from "./search-result.module.css";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTMDB } from "../../../api/tmdbDATA/useTMDB";

const SearchResult = ({ keyword, isActive }) => {
  const router = useRouter();
  const { getSearchResult } = useTMDB();

  const {
    isPending,
    isSuccess,
    data: results,
  } = useQuery({
    queryKey: ["search", keyword],
    queryFn: async () => {
      return getSearchResult({ query: keyword, page: 1 });
    },
  });

  const moveToDetail = useCallback((result) => {
    const { id, media_type } = result;

    router.push(`/${id}/${media_type}/?tab=videos`);
    // router.push(`/movies/${id}?tab=videos`);
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
              onClick={() => moveToDetail(result)}
            >
              <div className={styles.left}>
                {result.poster_path ? (
                  <img src={result.poster_path} alt={result.name} />
                ) : (
                  <div>no poster</div>
                )}
              </div>
              <div className={styles.right}>
                <h4>{result.title}</h4>
                <h5>{result.original_title}</h5>
                <p>
                  <span>{getMedia(result.media_type)}</span>
                  <span>{result.release_year}</span>
                </p>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
};

const getMedia = (media) => {
  const mediaObject = {
    tv: "tv",
    movie: "영화",
  };

  return mediaObject[media];
};

export default SearchResult;
