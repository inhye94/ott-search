import { Suspense } from "react";
import MovieSimilar from "../../../../components/movie-similar";

const MovieSimilarPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  return (
    <Suspense fallback={"Loading Movie Similar"}>
      <MovieSimilar id={id} />
    </Suspense>
  );
};

export default MovieSimilarPage;
