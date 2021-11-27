import React from "react";
import "./App.sass";

import BookDetailCard from "components/BookDetailCard/BookDetailCard";
import Alert from "components/Alert/Alert";
import BooksView from "components/BooksView/BooksView";
import SearchBar from "components/SearchBar/SearchBar";

import { selectDetailedBook, selectBooksStatus } from "app/slices/books/booksSlice";
import { useAppSelector } from "app/hooks";

function App() {
  const detailed = useAppSelector(selectDetailedBook);
  const status = useAppSelector(selectBooksStatus);

  return (
    <div className="App">
      {status === "failed" && <Alert message={"Что-то пошло не так"} />}
      <SearchBar />
      {!detailed ? <BooksView /> : <BookDetailCard book={detailed} />}
    </div>
  );
}

export default App;
