"use client";

import Link from "next/link";

import styles from "./movie-card.module.css";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

interface MovieCardPropsType {
  id: number;
  poster_path: string;
  title: string;
}

const MovieCard = ({ id, poster_path, title }: MovieCardPropsType) => {
  const detailLink = useRef<string>(`/${id}/movie`);

  const router = useRouter();

  const pushDetailPageToHistory = useCallback(() => {
    router.push(detailLink.current);
  }, []);

  return (
    <article className={styles.card}>
      <img
        src={poster_path}
        alt={`${poster_path}의 포스터`}
        onClick={pushDetailPageToHistory}
      />
      <Link prefetch href={detailLink.current}>
        {title}
      </Link>
    </article>
  );
};

export default MovieCard;
