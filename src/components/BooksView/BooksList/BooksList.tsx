import React from "react";
import "./BookList.sass";

import BookCard from "components/BooksView/BookCard/BookCard";

import { IBook } from "app/slices/books/booksSlice";

interface IBookListProps {
  books: IBook[];
}

function BookList({ books }: IBookListProps) {
  return (
    <div className="BookList">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}

export default BookList;
