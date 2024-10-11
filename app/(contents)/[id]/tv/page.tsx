import ContentsProvider from "../../../../src/components/contents-provider";
import Layout from "../../../../src/components/layout";
import Tag from "../../../../src/components/tag";

import { useTMDB } from "../../../../src/api/tmdbDATA/useTMDB";

import styles from "../page.module.css";

const TvPage = async ({ params: { id } }: { params: { id: number } }) => {
  const { getTvInfo, getTvProvider } = useTMDB();

  const info = await getTvInfo(id);
  const providers = await getTvProvider(id);

  return (
    <article>
      <h3 className="visually-hidden">TV 프로그램</h3>

      <section>
        <Layout className={styles.container}>
          <h4 className={styles.title}>콘텐츠 제공하는 곳</h4>

          <ContentsProvider providers={providers} />
        </Layout>
      </section>

      <section>
        <Layout>
          <h4 className={styles.title}>프로그램 정보</h4>

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
                <Tag>TV</Tag>
                {info.adult && <Tag color="red">청소년 관람불가</Tag>}
              </div>

              <h5 className={styles.name}>{info.title}</h5>

              <p className={styles.release}>
                <span>{info.original_title}</span>
                <span>{info.release_year}</span>
                <span>총 {info.number_of_episodes}편</span>
              </p>

              <div className={styles["tag-group"]}>
                {info.genres.map((genre) => (
                  <Tag key={genre.id} color="gray">
                    {genre.name}
                  </Tag>
                ))}
              </div>

              <p className={styles.overview}>{info.overview}</p>

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

export default TvPage;
