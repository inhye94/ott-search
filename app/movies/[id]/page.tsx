import { Suspense } from "react";
import MovieVideo from "../../../components/movie-video";
import MovieCreditCard from "../../../components/movie-credit";
import MovieProvider from "../../../components/movie-provider";
import MovieSimilar from "../../../components/movie-similar";

import MovieNav, { MenuItemType } from "./movie-nav";

interface MoviePagePropsType {
  params: { id: number };
  searchParams: { tab: string };
}

const menus: MenuItemType[] = [
  { id: 1, text: "videos", url: "videos" },
  { id: 2, text: "credits", url: "credits" },
  { id: 3, text: "providers", url: "providers" },
  { id: 4, text: "similars", url: "similars" },
];

const MoviePage = ({
  params: { id },
  searchParams: { tab },
}: MoviePagePropsType) => {
  return (
    <>
      <MovieNav menus={menus} />

      <section>
        <h3 className="visually-hidden">탭 콘텐츠</h3>
        <Suspense fallback={`Loading Movie ${tab}...`}>
          {tab === "videos" && <MovieVideo id={id} />}
          {tab === "credits" && <MovieCreditCard id={id} />}
          {tab === "providers" && <MovieProvider id={id} />}
          {tab === "similars" && <MovieSimilar id={id} />}
        </Suspense>
      </section>
    </>
  );
};

export default MoviePage;
