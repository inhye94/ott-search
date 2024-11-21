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
          overview="4살 박인혜"
          variant="square"
          round
        />
      </div>

      <div className={styles.github}>
        <Tag tag="link" href="https://github.com/inhye94">
          @inhye94 &rarr;
        </Tag>
      </div>

      <p className={styles.desc}>
        어렸을 때 웃는 얼굴이 꽤나 맥도날드 마스코트와 비슷하게 생겼네요.
        <br />
        <br />
        얼마전에 깃허브 네임을 변경했습니다.
        <br />
        (Dueto Park &gt;&gt; inhye94)
        <br />
        영어 이름이 부끄러워서요.
        <br />
        <br />
        날씨가 좋은 날 강남의 한 카페에서
        <br />
        친구들과 영어이름 짓기를 시작되었습니다.
        <br />
        제 이름이 '인혜'인데, due to라는 숙어의 뜻이 '~으로 인해'더라구요.
        <br />
        발음이 비슷하다는 이유로 dueto park가 되었습니다.
        <br />
        TMI이지만 제 친구 서우는 west cow, 소희는 little joy, 수빈이는
        desert입니다.
        <br />
        짧은 가방끈이 참 애석하네요.
        <br />
        <br />
        이런들 어떠하며, 저런들 어떠합니까
        <br />
        즐거우면 된거라 생각합니다.
        <br />
        덕분에 저와 친구들은 좋은 추억을 쌓았으니까요.
        <br />
        <br />
        엉뚱한 이유일지라도 과정이 재미있는 개발을 하고 싶습니다.
        <br />
        매우 소박한 저의 개발 철학입니다.
      </p>
    </Layout>
  );
};

export default AboutUsPage;
