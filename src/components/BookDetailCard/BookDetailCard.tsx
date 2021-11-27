import React from "react";
import "./BookDetailCard.sass";

import { useAppDispatch } from "app/hooks";
import { IBook, detail } from "app/slices/books/booksSlice";

interface IBookDetailCardProps {
  book: IBook;
}

function BookDetailCard({ book }: IBookDetailCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="BookDetailCard" onClick={() => dispatch(detail(null))}>
      <div className="BookDetailCard-image">
        <img alt={book.title} src={book.cover} />
      </div>
      <div className="BookDetailCard-cathegories">
        <span>{book.categories?.join(" / ")}</span>
      </div>
      <div className="BookDetailCard-author">
        <span>{book.authors?.join(", ")}</span>
      </div>
      <div className="BookDetailCard-title">
        <span>{book.title}</span>
      </div>
      <div className="BookDetailCard-pages">
        <span>{book.pages && `Страниц: ${book.pages}`}</span>
      </div>
      <div className="BookDetailCard-description">
        <span>{book.description}</span>
      </div>
    </div>
  );
}

export default BookDetailCard;
