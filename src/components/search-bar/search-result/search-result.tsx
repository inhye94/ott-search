import { DetailedHTMLProps, OlHTMLAttributes, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTMDB } from "../../../api/tmdbDATA/useTMDB";
import { getMedia } from "../../../utils/format";

import styles from "./search-result.module.css";

import type { SearchItemType } from "../../../model/contents";

type NativeUlProps = DetailedHTMLProps<
  OlHTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

export interface SearchResultPropsType extends NativeUlProps {
  keyword: string;
  isActive: boolean;
}

const SearchResult = ({
  keyword,
  isActive,
  ...props
}: SearchResultPropsType) => {
  const router = useRouter();
  const { getSearchResult } = useTMDB();

  const { isLoading, data: results } = useQuery({
    queryKey: ["search", keyword],
    queryFn: async () => {
      return getSearchResult({ query: keyword, page: 1 });
    },
  });

  const pushDetailPageToHistory = useCallback((result: SearchItemType) => {
    const { id, media_type } = result;

    router.push(`/${id}/${media_type}`);
  }, []);

  if (!isActive && !keyword) return;

  if (!keyword) {
    return (
      <div className={styles.list}>
        <div className={styles.empty}>검색어를 입력해주세요.</div>
      </div>
    );
  }

  if (keyword && isLoading) {
    return (
      <div className={styles.list}>
        <div className={styles.empty}>
          <p>
            <span aria-hidden="true">🔍</span> "{keyword}"에 대해 검색 중
          </p>
        </div>
      </div>
    );
  }

  return (
    <ul className={styles.list} {...props}>
      <div className={styles.summary}>
        <p>
          <span aria-hidden="true">🔍</span> "{keyword}"에 대한 검색 결과
        </p>
        <p>총 {results ? results.length : 0}건</p>
      </div>

      {results &&
        results.map((result) => (
          <li key={result.id} className={styles.item}>
            <article
              className={styles.card}
              onClick={() => pushDetailPageToHistory(result)}
            >
              <div className={styles.left}>
                {result.poster_path ? (
                  <img src={result.poster_path} alt={result.title} />
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

export default SearchResult;
