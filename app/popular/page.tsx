import { Metadata } from "next";
import { axiosInstance } from "../../src/api/tmdbDATA/client";
import MovieCard from "../../src/components/movie-card";
import Layout from "../../src/components/layout";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Popular",
};

const getPopularMovies = async () => {
  return axiosInstance
    .get(`movie/popular`, {
      params: {
        language: "ko",
        page: 1,
      },
    })
    .then((res) => {
      const { method, url } = res.config;
      const { status } = res;

      if (status !== 200) {
        throw Error(
          `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
        );
      }

      return res.data.results;
    })
    .catch((error) => console.log(error.message));
};

export default async function PopularPage() {
  const populars = await getPopularMovies();
  return (
    <Layout className={styles.container}>
      {populars.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          poster_path={
            movie.poster_path.includes(process.env.NEXT_PUBLIC_TMDB_IMAGE_URL)
              ? movie.poster_path
              : process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + movie.poster_path
          }
          title={movie.title}
        />
      ))}
    </Layout>
  );
}
