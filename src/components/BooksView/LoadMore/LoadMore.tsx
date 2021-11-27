import React, { useState } from "react";
import "./LoadMore.sass";

import { useAppDispatch } from "app/hooks";
import { getBooks } from "app/slices/books/booksSlice";

function LoadMore() {
  const dispatch = useAppDispatch();

  return (
    <div className="LoadMore">
      <button onClick={() => dispatch(getBooks({ addToBooks: true }))}>Загрузить еще</button>
    </div>
  );
}

export default LoadMore;
