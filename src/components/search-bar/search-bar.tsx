"use client";

import { useState } from "react";
import SearchForm from "./search-form";
import SearchResult from "./search-result";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  const changeKeyword = (text: string) => {
    setKeyword(text);
  };

  const toggleActive = (status: boolean) => {
    setActive(status);
  };

  return (
    <QueryClientProvider client={client}>
      <section>
        <h2 className="visually-hidden">검색바</h2>

        <SearchForm onChange={changeKeyword} onActive={toggleActive} />
        <SearchResult keyword={keyword} isActive={active} />
      </section>
    </QueryClientProvider>
  );
};

export default SearchBar;
