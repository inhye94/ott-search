"use client";

import Link from "next/link";

import styles from "./movie-card.module.css";
import { useRouter } from "next/navigation";

interface MovieCardPropsType {
  id: string;
  poster_path: string;
  title: string;
}

const MovieCard = ({ id, poster_path, title }: MovieCardPropsType) => {
  const detailLink = `/${id}/movie`;

  const router = useRouter();
  const pushRouter = () => {
    router.push(detailLink);
  };

  return (
    <article className={styles.card}>
      <img
        src={poster_path}
        alt={`${poster_path}의 포스터`}
        onClick={pushRouter}
      />
      <Link prefetch href={detailLink}>
        {title}
      </Link>
    </article>
  );
};

export default MovieCard;
