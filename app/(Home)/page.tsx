import { Metadata } from "next";

import styles from "./page.module.css";

import MovieCard from "./movie-card";
import { API_URL } from "../constants";

export const metadata: Metadata = {
  title: "Home",
};

const getMovies = async () => {
  console.log("Fetching!");
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    return fetch(API_URL).then((res) => res.json());
  } catch (error) {
    console.error(error.massage);
  }
};

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
        />
      ))}
    </div>
  );
}
