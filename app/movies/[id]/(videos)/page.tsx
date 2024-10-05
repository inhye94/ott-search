import { Suspense } from "react";
import MovieVideo from "../../../../components/movie-video";
import { ParamsType } from "../layout";

const MovieVideos = ({ params: { id } }: ParamsType) => {
  return (
    <Suspense fallback={"Loading Movie Video"}>
      <MovieVideo id={id} />
    </Suspense>
  );
};

export default MovieVideos;
