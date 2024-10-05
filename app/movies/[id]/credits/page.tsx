import { Suspense } from "react";
import MovieCreditCard from "../../../../components/movie-credit";

const MovieCreditsPage = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  return (
    <Suspense fallback={"Loading Movie Credits"}>
      <MovieCreditCard id={id} />
    </Suspense>
  );
};

export default MovieCreditsPage;
