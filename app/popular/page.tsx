import { Metadata } from "next";
import MovieCard from "../../src/components/movie-card";
import Layout from "../../src/components/layout";

import styles from "./page.module.css";
import { useTMDB } from "../../src/api/tmdbDATA/useTMDB";

export const metadata: Metadata = {
  title: "추천 영화",
};

export default async function PopularPage() {
  const { getPopularMovies } = useTMDB();
  const populars = await getPopularMovies({ page: 1 });

  return (
    <Layout className={styles.container}>
      {populars.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
        />
      ))}
    </Layout>
  );
}
