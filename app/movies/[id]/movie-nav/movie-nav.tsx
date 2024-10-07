"use client";

import { useRouter, useSearchParams } from "next/navigation";

import styles from "../../../../components/navigation/navigation.module.css";

export interface MenuItemType {
  id: number;
  text: string;
  url: string;
}

export interface MovieNavType {
  menus: MenuItemType[];
}

const MovieNav = ({ menus }: MovieNavType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const activeTab = (tab: string) => {
    router.push(`?tab=${tab}`);
  };

  return (
    <nav className={`${styles.nav} ${styles.local}`}>
      <h3 className="visually-hidden">탭 메뉴</h3>

      {menus.map((menu) => (
        <button
          key={menu.id}
          className={currentTab === menu.url ? styles.active : ""}
          onClick={() => activeTab(menu.url)}
        >
          {menu.text}
        </button>
      ))}
    </nav>
  );
};

export default MovieNav;
