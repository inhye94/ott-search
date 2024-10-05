import { Suspense } from "react";
import MovieProvider from "../../../../components/movie-provider";

const MovieProviderPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  return (
    <Suspense fallback={"Loading Movie Provider"}>
      <MovieProvider id={id} />
    </Suspense>
  );
};

export default MovieProviderPage;
