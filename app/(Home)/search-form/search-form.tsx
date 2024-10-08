"use client";

import { Suspense, useCallback, useRef, useState } from "react";

import styles from "./search-form.module.css";
import { axiosInstance } from "../../../api/tmdbDATA/client";
import { debounce } from "lodash";
import SearchResult from "./search-result";

const getSearchResult = async (keyword: string) => {
  return axiosInstance
    .get(`search/multi`, {
      params: {
        query: keyword,
        include_adult: false,
        language: "ko",
        page: 1,
      },
    })
    .then((res) => {
      const { method, url } = res.config;
      const { status } = res;

      if (status !== 200) {
        throw Error(
          `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`
        );
      }

      return res.data.results;
    })
    .catch((error) => console.log(error.message));
};

const SearchForm = () => {
  const input = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");
  const [results, setResults] = useState([]);
  const [active, setActive] = useState<boolean>(false);

  const debounceUpdate = useCallback(
    debounce(async (keyword: string) => {
      await getSearchResult(keyword).then((data) => setResults(data));
    }, 500),
    []
  );

  const updateResults = async () => {
    await debounceUpdate(input.current.value.trim());
  };

  return (
    <>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          ref={input}
          className={styles.input}
          type="text"
          placeholder="영화, 드라마 검색"
          onChange={() => setText(input.current.value)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onInput={updateResults}
          value={text}
        />
      </form>

      <Suspense fallback={"Loading search results..."}>
        {(active || results.length > 0) && (
          <SearchResult keyword={input.current.value} results={results} />
        )}
      </Suspense>
    </>
  );
};

export default SearchForm;
