"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MovieVideo from "../../../components/movie-video";
import MovieCreditCard from "../../../components/movie-credit";
import MovieProvider from "../../../components/movie-provider";
import MovieSimilar from "../../../components/movie-similar";

import styles from "../../../components/navigation/navigation.module.css";

interface MoviePagePropsType {
  params: { id: number };
}

const MoviePage = ({ params: { id } }: MoviePagePropsType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const activeTab = (tab: string) => {
    router.push(`?tab=${tab}`);
  };

  return (
    <>
      <nav className={`${styles.nav} ${styles.local}`}>
        <h3 className="visually-hidden">탭 메뉴</h3>
        <button
          className={currentTab === "videos" ? styles.active : ""}
          onClick={() => activeTab("videos")}
        >
          videos
        </button>
        <button
          className={currentTab === "credits" ? styles.active : ""}
          onClick={() => activeTab("credits")}
        >
          credits
        </button>
        <button
          className={currentTab === "providers" ? styles.active : ""}
          onClick={() => activeTab("providers")}
        >
          providers
        </button>
        <button
          className={currentTab === "similars" ? styles.active : ""}
          onClick={() => activeTab("similars")}
        >
          similars
        </button>
      </nav>

      <section>
        <h3 className="visually-hidden">탭 콘텐츠</h3>
        <Suspense fallback={`Loading Movie ${currentTab}...`}>
          {currentTab === "videos" && <MovieVideo id={id} />}
          {currentTab === "credits" && <MovieCreditCard id={id} />}
          {currentTab === "providers" && <MovieProvider id={id} />}
          {currentTab === "similars" && <MovieSimilar id={id} />}
        </Suspense>
      </section>
    </>
  );
};

export default MoviePage;
