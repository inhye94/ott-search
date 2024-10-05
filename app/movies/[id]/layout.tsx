import { Suspense } from "react";
import MovieInfo from "../../../components/movie-info";
import { MovieNavigation } from "../../../components/navigation";
import { getMovie } from "../../../components/movie-info/movie-info";

export interface ParamsType {
  params: { id: number };
}

export const generateMetadata = async ({ params: { id } }: ParamsType) => {
  const movie = await getMovie(id);

  return {
    title: movie.title,
  };
};

export default function MovieLayout({
  params: { id },
  children,
}: {
  tabs: React.ReactNode;
  params: { id: number };
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={"Loading Movie Info"}>
        <MovieInfo id={id} />
      </Suspense>

      <MovieNavigation id={id} />

      {children}
    </div>
  );
}
