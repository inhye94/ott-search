import Link from "next/link";
import Layout from "../layout";
import Logo from "../logo";

import styles from "./gnb.module.css";

const Gnb = () => {
  return (
    <header className={styles.gnb}>
      <Layout className={styles.layout}>
        <Logo />

        <nav className={styles.left}>
          <h3 className="visually-hidden">메뉴</h3>
          <Link href="/popular">추천</Link>
        </nav>

        <div className={styles.right}>
          <h3 className="visually-hidden">제작자</h3>
          <Link href="/about-us">About us</Link>
        </div>
      </Layout>
    </header>
  );
};

export default Gnb;
