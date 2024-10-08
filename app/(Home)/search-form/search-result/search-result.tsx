import classNames from "classnames";
import styles from "./search-result.module.css";

const getYear = (date) => {
  return date.split("-")[0];
};

const SearchResult = ({ results, keyword }) => {
  // empty
  if (results.length == 0) {
    return (
      <div className={classNames(styles.list, styles.empty)}>
        {keyword
          ? `"${keyword}"에 대한 검색 결과가 없습니다.`
          : "검색어를 입력해주세요."}
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <ul className={styles.list}>
        <div className={styles.summary}>
          <p>
            <span aria-hidden="true">🔍</span> "{keyword}"에 대한 검색 결과
          </p>
          <p>총 {results.length}건</p>
        </div>

        {results.map((result) => (
          <li key={result.id} className={styles.item}>
            <article className={styles.card}>
              <div className={styles.left}>
                {result.poster_path ? (
                  <img
                    src={
                      process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
                      result.poster_path
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
                  <span>
                    {result.media_type === "tv" ? result.media_type : "영화"}
                  </span>
                  <span>
                    {getYear(result.first_air_date || result.release_date)}
                  </span>
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    );
  }
};

export default SearchResult;
