import Layout from "../../../../src/components/layout";
import ContentsProvider from "../components/contents-provider";
import ContentsInfo from "../components/contents-info";

import { useTMDB } from "../../../../src/api/tmdbDATA/useTMDB";

import styles from "../page.module.css";

const TvPage = async ({ params: { id } }: { params: { id: number } }) => {
  const { getTvInfo, getTvProvider } = useTMDB();

  const info = await getTvInfo(id);
  const providers = await getTvProvider(id);

  return (
    <article>
      <h3 className="visually-hidden">TV 프로그램</h3>

      <section>
        <Layout className={styles.container}>
          <h4 className={styles.title}>콘텐츠 제공하는 곳</h4>

          <ContentsProvider providers={providers} />
        </Layout>
      </section>

      <section>
        <Layout>
          <h4 className={styles.title}>프로그램 정보</h4>

          <ContentsInfo info={info} />
        </Layout>
      </section>
    </article>
  );
};

export default TvPage;
