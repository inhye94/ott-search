import { FadeLoader } from "react-spinners";

import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <FadeLoader color="aquamarine" height={12} />
      <p>페이지를 로딩중입니다!</p>
    </div>
  );
};

export default Loading;
