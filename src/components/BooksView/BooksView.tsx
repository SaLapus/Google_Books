import React from "react";
import "./BooksView.sass";

import { useAppSelector } from "app/hooks";
import { selectBooks, selectBooksStatus, selectTotalBooks } from "app/slices/books/booksSlice";

import BookList from "components/BooksView/BooksList/BooksList";
import LoadMore from "components/BooksView/LoadMore/LoadMore";
import Loading from "components/BooksView/Loading/Loading";

function BooksView() {
  const books = useAppSelector(selectBooks);
  const total = useAppSelector(selectTotalBooks);
  const status = useAppSelector(selectBooksStatus);

  return (
    <div className="BooksView">
      <BookList books={books} />

      {status === "loading" && <Loading />}
      {(books.length > 0 || total > 0) && <LoadMore />}
    </div>
  );
}

export default BooksView;
