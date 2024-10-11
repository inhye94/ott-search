import Layout from "../../../../src/components/layout";
import ContentsProvider from "../../../../src/components/contents-provider";
import ContentsInfo from "../../../../src/components/contents-info";

import { useTMDB } from "../../../../src/api/tmdbDATA/useTMDB";

import styles from "../page.module.css";

const MoviePage = async ({ params: { id } }: { params: { id: number } }) => {
  const { getMovieInfo, getMovieProvider } = useTMDB();

  const info = await getMovieInfo(id);
  const providers = await getMovieProvider(id);

  return (
    <article>
      <h3 className="visually-hidden">영화</h3>

      <section>
        <Layout className={styles.container}>
          <h4 className={styles.title}>콘텐츠 제공하는 곳</h4>

          <ContentsProvider providers={providers} />
        </Layout>
      </section>

      <section>
        <Layout>
          <h4 className={styles.title}>영화 정보</h4>

          <ContentsInfo info={info} />
        </Layout>
      </section>
    </article>
  );
};

export default MoviePage;
