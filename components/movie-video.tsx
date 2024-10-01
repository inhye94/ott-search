import { API_URL } from "../app/(Home)/page";

const getVideos = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  throw new Error("Something is broken!");
  // try {
  //   return fetch(`${API_URL}/${id}/videos`).then((res) => res.json());
  // } catch (error) {
  //   console.error(errormassage);
  // }
};

const MovieVideo = async ({ id }: { id: number }) => {
  const video = await getVideos(id);
  return <div>{JSON.stringify(video)}</div>;
};

export default MovieVideo;
