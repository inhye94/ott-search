import { Suspense } from "react";
import MovieInfo from "../../../components/movie-info";
import MovieVideo from "../../../components/movie-video";
import { getMovie } from "../../../components/movie-info/movie-info";

interface ParamsType {
  params: { id: number };
}

export const generateMetadata = async ({ params: { id } }: ParamsType) => {
  const movie = await getMovie(id);

  return {
    title: movie.title,
  };
};

const MovieDetail = ({ params: { id } }: ParamsType) => {
  return (
    <div>
      <Suspense fallback={"Loading Movie Info"}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={"Loading Movie Video"}>
        <MovieVideo id={id} />
      </Suspense>
    </div>
  );
};

export default MovieDetail;
