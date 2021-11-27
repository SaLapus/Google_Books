import React, { useRef } from "react";

import "./SearchInput.sass";

import { useAppDispatch } from "app/hooks";
import { setSearch } from "app/slices/search/searchSlice";

function SearchInput({ onSearchReady }: { onSearchReady: () => void }) {
  const input = useRef(null);

  const dispatch = useAppDispatch();
  const handleChange = () => {
    if (input.current) {
      const search = (input.current as HTMLInputElement).value
        .split(" ")
        .filter((s) => !!s)
        .join("+");

      dispatch(setSearch(search));
      onSearchReady();
    }
  };

  const onEnterClick: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") handleChange();
  };

  return (
    <div className="SearchInput">
      <div className="SearchInput-wrap">
        <input className="SearchInput-input" ref={input} onKeyDown={onEnterClick} />
        <button onClick={handleChange}>Ввод</button>
      </div>
    </div>
  );
}

export default SearchInput;
