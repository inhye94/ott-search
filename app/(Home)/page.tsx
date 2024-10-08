import { Metadata } from "next";

import { API_URL } from "../constants";
import MovieCard from "../../components/movie-card";
import Layout from "../../components/layout";
import SearchForm from "./search-form";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
};

const getMovies = async () => {
  console.log("Fetching!");
  await new Promise((resolve) => setTimeout(resolve, 500));

  return fetch(API_URL)
    .then((res) => {
      if (!res.ok) {
        throw Error(`${res.status} Error`);
      }

      return res.json();
    })
    .catch((error) => {
      console.error(error.massage);
    });
};

export default async function HomePage() {
  return (
    <Layout>
      <SearchForm />
      {/* {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
        />
      ))} */}
    </Layout>
  );
}
