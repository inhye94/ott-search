import Tag from "../../../../../src/components/tag";
import {
  MovieInfoResponseType,
  TvInfoResponseType,
} from "../../../../../src/model/contents";

import styles from "./contents-info.module.css";

type MediaType = MovieInfoResponseType["media_type"];

type ContentsInfoPropsType<T extends MediaType> = T extends "영화"
  ? MovieInfoResponseType
  : TvInfoResponseType;

interface ContentInfoType<T extends MediaType> {
  info: ContentsInfoPropsType<T>;
  media: T;
}

const ContentsInfo = <T extends MediaType>({
  info,
  media,
}: ContentInfoType<T>) => {
  return (
    <>
      <img
        className={styles.backdrop}
        src={info.backdrop_path}
        alt={info.title}
      />

      <div className={styles.info}>
        <div className={styles.left}>
          <img src={info.poster_path} alt={info.title} />
        </div>

        <div className={styles.right}>
          <div className={styles["tag-group"]}>
            <Tag>{info.media_type}</Tag>
            {info.adult && <Tag color="red">청소년 관람불가</Tag>}
          </div>

          <h5 className={styles.name}>{info.title}</h5>

          <p className={styles.release}>
            <span>{info.original_title}</span>
            <span>{info.release_year}</span>
            {"number_of_episodes" in info && info.number_of_episodes && (
              <span>총 {info.number_of_episodes}편</span>
            )}
            <span>
              <span aria-label="평점">⭐️ </span>
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

          {info.tagline && <p className={styles.tagline}>{info.tagline}</p>}

          {"networks" in info && info.networks && (
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
          )}

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
    </>
  );
};

export default ContentsInfo;
