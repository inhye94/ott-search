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
          <h2 className="visually-hidden">메뉴</h2>

          <ul className={styles.list}>
            <li>
              <Link href="/popular">추천</Link>
            </li>
          </ul>
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
