import ContentsProvider from "../../../../src/components/contents-provider";
import Layout from "../../../../src/components/layout";
import Tag from "../../../../src/components/tag";

import { useTMDB } from "../../../../src/api/tmdbDATA/useTMDB";

import styles from "../page.module.css";

const MoviePage = async ({ params: { id } }: { params: { id: number } }) => {
  const { getMovieInfo, getMovieProvider } = useTMDB();

  const info = await getMovieInfo(id);
  const providers = await getMovieProvider(id);

  return (
    <article>
      <h3 className="visually-hidden">영화</h3>

      <section>
        <Layout className={styles.container}>
          <h4 className={styles.title}>콘텐츠 제공하는 곳</h4>

          <ContentsProvider providers={providers} />
        </Layout>
      </section>

      <section>
        <Layout>
          <h4 className={styles.title}>영화 정보</h4>

          <img
            className={styles.backdrop}
            src={info.backdrop_path}
            alt={info.name}
          />

          <div className={styles.info}>
            <div className={styles.left}>
              <img src={info.poster_path} alt={info.name} />
            </div>

            <div className={styles.right}>
              <div className={styles["tag-group"]}>
                <Tag>영화</Tag>
                {info.adult && <Tag color="red">청소년 관람불가</Tag>}
              </div>

              <h5 className={styles.name}>{info.title}</h5>

              <p className={styles.release}>
                <span>{info.original_title}</span>
                <span>{info.release_year}</span>
                <span>{info.runtime}분</span>
                <span>
                  <span aria-label="평점">⭐️</span>
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

              <p className={styles.tagline}>{info.tagline}</p>

              {info.homepage && (
                <Tag tag="link" href={info.homepage} className={styles.link}>
                  홈페이지 &rarr;
                </Tag>
              )}

              <p className={styles.from}>
                <strong>
                  이 데이터는 JustWatch에서 제공받았습니다. | Data provided by
                  JustWatch.
                </strong>
              </p>
            </div>
          </div>
        </Layout>
      </section>
    </article>
  );
};

export default MoviePage;
