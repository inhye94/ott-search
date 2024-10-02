import { API_URL } from "../../app/(home)/page";

import styles from "./movie-info.module.css";

export const getMovie = async (id: number) => {
  try {
    return fetch(`${API_URL}/${id}`).then((res) => res.json());
  } catch (error) {
    console.error(error.massage);
  }
};

const MovieInfo = async ({ id }: { id: number }) => {
  const movie = await getMovie(id);
  return (
    <section className={styles.container}>
      <img
        className={styles.poster}
        src={movie.poster_path}
        alt={movie.title}
      />

      <div className={styles.info}>
        {movie.adult && <strong className={styles.tag}>청소년 관람불가</strong>}

        <h2 className={styles.title}>{movie.original_title}</h2>

        <dl className={styles.details}>
          <dt className="visually-hidden">별점</dt>
          <dd>⭐️ {movie.vote_average.toFixed(1)}</dd>
        </dl>

        <blockquote className={styles.tagline}>"{movie.tagline}"</blockquote>

        <p className={styles.desc}>{movie.overview}</p>

        <ul className={styles.extra}>
          <li>개봉일 : {movie.release_date}</li>
          <li>러닝타임: {movie.runtime}분</li>
        </ul>

        <a className={styles.link} href={movie.homepage} target="_blank">
          homepage &rarr;
        </a>
      </div>
    </section>
  );
};

export default MovieInfo;
