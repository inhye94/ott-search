import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./search-form.module.css";
import { debounce } from "lodash";

const SearchForm = ({ onChange, onActive }) => {
  const input = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>("");

  const debounceUpdate = useCallback(
    debounce((text) => {
      onChange(text.trim());
    }, 500),
    []
  );

  useEffect(() => {
    debounceUpdate(input.current.value);
  }, [text]);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <input
        ref={input}
        className={styles.input}
        type="text"
        placeholder="영화, 드라마 검색"
        onInput={() => setText(input.current.value)}
        onFocus={() => onActive(true)}
        onBlur={() => onActive(false)}
        value={text}
      />
    </form>
  );
};

export default SearchForm;