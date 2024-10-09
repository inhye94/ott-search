import { API_URL } from "../../../app/constants";
import styles from "./movie-credit.module.css";

const getMovieCredits = async (id: number) => {
  return fetch(`${API_URL}/${id}/credits`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} 에러가 발생했습니다!`);
      }

      return res.json();
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const MovieCreditCard = async ({ id }: { id: number }) => {
  const credits = await getMovieCredits(id);

  return (
    <div className={styles.container}>
      {credits.map((credit) => (
        <article key={credit.credit_id} className={styles.card}>
          <img src={credit.profile_path} alt={credit.original_name} />

          <dl>
            <dt className="visually-hidden">배우 이름</dt>
            <dd className={styles.name}>{credit.original_name}</dd>
            <dt className="visually-hidden">캐릭터 이름</dt>
            <dd className={styles.character}>{credit.character}</dd>
          </dl>
        </article>
      ))}
    </div>
  );
};

export default MovieCreditCard;
