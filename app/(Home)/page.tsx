import { Metadata } from "next";

import { API_URL } from "../constants";
import Layout from "../../components/layout";
import SearchForm from "./search-form";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  return (
    <Layout>
      <SearchForm />
    </Layout>
  );
}
