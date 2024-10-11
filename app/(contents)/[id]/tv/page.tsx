import classNames from "classnames";
import { axiosInstance } from "../../../../src/api/tmdbDATA/client";
import ContentsProvider from "../../../../src/components/contents-provider";
import Layout from "../../../../src/components/layout";
import Tag from "../../../../src/components/tag";

import { getYear } from "../../../../src/utils/date";

import styles from "./page.module.css";

const getTvInfo = async (id: number) => {
  return axiosInstance
    .get(`tv/${id}`, { params: { language: "ko" } })
    .then((res) => {
      const { method, url } = res.config;
      const { status } = res;

      if (status !== 200) {
        throw Error(
          `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
        );
      }

      return res.data;
    })
    .catch((error) => console.log(error.message));
};

const getProvider = async (id: number) => {
  return axiosInstance
    .get(`tv/${id}/watch/providers`, { params: { language: "ko" } })
    .then((res) => {
      const { method, url } = res.config;
      const { status } = res;

      if (status !== 200) {
        throw Error(
          `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
        );
      }

      return res.data?.results?.KR;
    })
    .catch((error) => console.log(error.message));
};

const TvPage = async ({ params: { id } }: { params: { id: number } }) => {
  const info = await getTvInfo(id);
  const providers = await getProvider(id);

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
            src={
              process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
              (info.backdrop_path || info.poster_path)
            }
            alt={info.name}
          />

          <div className={styles.info}>
            <div className={styles.left}>
              <img
                src={process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + info.poster_path}
                alt={info.name}
              />
            </div>

            <div className={styles.right}>
              <div className={styles["tag-group"]}>
                <Tag>TV</Tag>
                {info.adult && <Tag color="red">청소년 관람불가</Tag>}
              </div>

              <h5 className={styles.name}>{info.name}</h5>

              <p className={styles.release}>
                <span>{info.original_name}</span>
                <span>{getYear(info.first_air_date)}</span>
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
                    src={
                      process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
                      streaming.logo_path
                    }
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

const getProviderType = (type) => {
  const object = {
    flatrate: "OTT",
    buy: "구매처",
    rent: "대여",
  };

  return object[type];
};

export default TvPage;
