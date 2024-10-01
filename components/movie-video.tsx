import { API_URL } from "../app/(home)/page";

const getVideos = async (id: number) => {
  try {
    return fetch(`${API_URL}/${id}/videos`).then((res) => res.json());
  } catch (error) {
    console.error(error.massage);
    throw Error("Movie video broken");
  }
};

const MovieVideo = async ({ id }: { id: number }) => {
  const video = await getVideos(id);
  return <div>{JSON.stringify(video)}</div>;
};

export default MovieVideo;
