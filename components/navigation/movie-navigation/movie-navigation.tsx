"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./movie-navigation.module.css";

const makeMenu = (id) => {
  return [
    { id: 1, url: `/movies/${id}`, text: "Videos" },
    { id: 2, url: `/movies/${id}/credits`, text: "Credits" },
    { id: 3, url: `/movies/${id}/providers`, text: "Providers" },
    { id: 4, url: `/movies/${id}/similars`, text: "Similars" },
  ];
};

export function MovieNavigation({ id }: { id: number }) {
  const path = usePathname();
  const navMenu = makeMenu(id);

  return (
    <nav className={styles.nav}>
      <ul>
        {navMenu.map((menu) => (
          <li key={menu.id} className={path === menu.url ? styles.active : ""}>
            <Link href={menu.url}>{menu.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
