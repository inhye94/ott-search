import { API_URL } from "../../app/constants";
import ProviderCard from "./provider-card/provider-card";

import styles from "./movie-provider.module.css";

const getMovieProvider = async (id: number) => {
  return fetch(`${API_URL}/${id}/providers`)
    .then((res) => {
      if (!res.ok) {
        throw Error(`${res.status} Error`);
      }

      return res.json();
    })
    .then((data) => data.KR)
    .catch((error) => {
      console.error(error.message);
    });
};

const MovieProvider = async ({ id }: { id: number }) => {
  const providers = await getMovieProvider(id);

  if (providers) {
    return (
      <div className={styles.container}>
        {Object.keys(providers)
          .filter((v) => v != "link")
          .map((key) => (
            <section className={styles.section}>
              <h3>{key}</h3>

              <ul>
                {providers[key] &&
                  providers[key].map((item, index) => (
                    <li key={index}>
                      <ProviderCard {...item} />
                    </li>
                  ))}
              </ul>
            </section>
          ))}
      </div>
    );
  }

  if (!providers) {
    return (
      <div className={styles.container}>
        <p>Provider가 없어용</p>
      </div>
    );
  }
};

export default MovieProvider;
