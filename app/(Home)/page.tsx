import { Metadata } from "next";

import Layout from "../../src/components/layout";
import SearchBar from "../../src/components/search-bar";

export const metadata: Metadata = {
  title: "검색",
};

export default function HomePage() {
  return (
    <Layout>
      <SearchBar />
    </Layout>
  );
}
