import { API_URL } from "../app/(Home)/page";

const getMovie = async (id: number) => {
  try {
    return fetch(`${API_URL}/${id}`).then((res) => res.json());
  } catch (error) {
    console.error(error.massage);
  }
};

const MovieInfo = async ({ id }: { id: number }) => {
  const movie = await getMovie(id);
  return <div>{JSON.stringify(movie)}</div>;
};

export default MovieInfo;
