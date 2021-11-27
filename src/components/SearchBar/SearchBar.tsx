import React, { useState } from "react";

import "./SearchBar.sass";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { getBooks, selectTotalBooks, clearBooks } from "app/slices/books/booksSlice";
import { setPages } from "app/slices/search/searchSlice";

import Categories from "./Categories/Categories";
import SearchInput from "./SearchInput/SearchInput";
import Sorting from "./Sorting/Sorting";

function SearchBar() {
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotalBooks);

  const setNewBooks = () => {
    dispatch(clearBooks())
    dispatch(setPages(0));
    dispatch(getBooks({ addToBooks: false }));
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-bg"></div>
      <div className="SearchBar-wrap">
        <SearchInput onSearchReady={setNewBooks} />
        <div className="SearchBar-selects">
          <Sorting />
          <Categories />
        </div>
        <div className="SearchBar-total">{total > 0 && `Найдено ${total} книг`}</div>
      </div>
    </div>
  );
}

export default SearchBar;
