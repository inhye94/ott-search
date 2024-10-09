import { API_URL } from "../../../app/constants";
import FlipCard from "../flip-card";

import styles from "./movie-similar.module.css";

const getMovieSimilar = async (id: number) => {
  return fetch(`${API_URL}/${id}/similar`)
    .then((res) => {
      if (!res.ok) {
        throw Error(`${res.status} Error`);
      }

      return res.json();
    })
    .catch((error) => console.error(error.message));
};

const MovieSimilar = async ({ id }: { id: number }) => {
  const similars = await getMovieSimilar(id);

  return (
    <div className={styles.contianer}>
      {similars.map((similar) => (
        <article key={similar.id} className={styles.card}>
          <FlipCard
            path={similar.poster_path}
            title={similar.original_title}
            overview={similar.overview}
          />

          <h4 className={styles.title}>{similar.original_title}</h4>
          <p className={styles.release}>{similar.release_date}</p>
        </article>
      ))}
    </div>
  );
};

export default MovieSimilar;
