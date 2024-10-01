import Link from "next/link";

export const metadata = {
  title: "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

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
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}
