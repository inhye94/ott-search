import { Metadata } from "next";
import FlipCard from "../../src/components/flip-card";
import Layout from "../../src/components/layout";
import Tag from "../../src/components/tag";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "만든 개발자",
};

const AboutUsPage = () => {
  return (
    <Layout>
      <div className={styles.profile}>
        <FlipCard
          path="https://avatars.githubusercontent.com/u/69448900?v=4"
          title="profile"
          overview="1997년 4살 박인혜"
          variant="square"
          round
        />
      </div>

      <div className={styles.github}>
        <Tag tag="link" href="https://github.com/DuetoPark">
          @DuetoPark &rarr;
        </Tag>
      </div>

      <p className={styles.desc}>
        due to: ~으로 인해
        <br />
        숙어 뜻이 저의 이름과 비슷해서 dueto park가 되었습니다.
        <br />
        제 친구 서우는 west cow 이며, 소희는 little joy, 수빈이는 desert 입니다.
        <br />
        <br />
        어렸을 때 웃는 얼굴이 꽤나 맥도날드 마스코트와 비슷하게 생겼네요.
        <br />
        고양이를 좋아하지만 잘 키울 자신이 없어서 사이버 집사로 만족하고
        있습니다.
        <br />
        강아지도 좋아합니다.
      </p>
    </Layout>
  );
};

export default AboutUsPage;
