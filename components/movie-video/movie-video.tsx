import { API_URL } from "../../app/(home)/page";

import styles from "./movie-video.module.css";

const getVideos = async (id: number) => {
  try {
    return fetch(`${API_URL}/${id}/videos`).then((res) => res.json());
  } catch (error) {
    console.error(error.massage);
    throw Error("Movie video broken");
  }
};

const MovieVideo = async ({ id }: { id: number }) => {
  const videos = await getVideos(id);
  return (
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://www.youtube.com/embed/${video.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  );
};

export default MovieVideo;
