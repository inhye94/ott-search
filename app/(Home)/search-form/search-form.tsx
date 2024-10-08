"use client";

import { useCallback, useRef, useState } from "react";

import styles from "./search-form.module.css";
import { axiosInstance } from "../../../api/tmdbDATA/client";
import { debounce } from "lodash";

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

  const debounceUpdate = useCallback(
    debounce(async (keyword: string) => {
      await getSearchResult(keyword).then((data) => setResults(data));
    }, 500),
    []
  );

  const updateResults = async () => {
    await debounceUpdate(input.current.value);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        ref={input}
        className={styles.input}
        type="text"
        placeholder="영화, 드라마 검색"
        onChange={() => setText(input.current.value)}
        onInput={updateResults}
        value={text}
      />

      <ul>
        {results.map((item) => (
          <li key={item.id}>
            <article>
              <img
                src={process.env.NEXT_PUBLIC_TMDB_IMAGE_URL + item.poster_path}
                alt={item.name}
              />
              <h3>
                {item.name || item.title} (
                {item.original_name || item.original_title})
              </h3>
              <p>{item.overview}</p>
              <p>{item.media_type}</p>
            </article>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SearchForm;
