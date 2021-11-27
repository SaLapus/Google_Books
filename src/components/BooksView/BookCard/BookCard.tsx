import React from "react";
import "./BookCard.sass";

import { useAppDispatch } from "app/hooks";
import { IBook, detail } from "app/slices/books/booksSlice";

interface IBookCardProps {
  book: IBook;
}

function BookCard({ book }: IBookCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="BookCard" onClick={() => dispatch(detail(book))}>
      <div className="BookCard-image">
        <img alt={book.title} src={book.cover} />
      </div>
      <div className="BookCard-author">
        <span>{book.authors?.join(", ")}</span>
      </div>
      <div className="BookCard-cathegory">
        <span>{book.categories && book.categories[0]}</span>
      </div>
      <div className="BookCard-title">
        <span>{book.title}</span>
      </div>
    </div>
  );
}

export default BookCard;
