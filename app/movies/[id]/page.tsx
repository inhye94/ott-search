import { Suspense } from "react";
import MovieInfo from "../../../components/movie-info";
import MovieVideo from "../../../components/movie-video";

const MovieDetail = ({ params: { id } }: { params: { id: number } }) => {
  return (
    <div>
      <div>
        <Suspense fallback={"Loading Movie Info"}>
          <MovieInfo id={id} />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={"Loading Movie Video"}>
          <MovieVideo id={id} />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetail;
