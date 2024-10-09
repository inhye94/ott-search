import Link from "next/link";

import styles from "./logo.module.css";

const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <Link href="/"> 👀 어디서 볼 수 있을까?</Link>
    </h1>
  );
};

export default Logo;
