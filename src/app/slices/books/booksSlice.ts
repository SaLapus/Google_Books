import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "app/store";

import { selectSearchInfo, setPages } from "app/slices/search/searchSlice";

import { fetchBooks } from "./booksAPI";

export interface IBook {
  title: string;
  authors: string[];
  categories: string[];
  description: string;
  pages: number;
  cover: string;
}

export interface BooksState {
  books: IBook[];
  detailedBook: IBook | null;
  total: number;
  status: "idle" | "loading" | "failed";
}

const initialState: BooksState = {
  books: [],
  detailedBook: null,
  total: 0,
  status: "idle",
};

export const getBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ addToBooks }: { addToBooks: boolean }, thunkAPI) => {
    const search = selectSearchInfo(thunkAPI.getState() as RootState);

    const { total, books, pages } = await fetchBooks(search);
    thunkAPI.dispatch(setPages(search.pages + pages));

    return {
      total,
      books,
      addToBooks,
    };
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.books = [];
    },
    detail: (state, action: PayloadAction<IBook | null>) => {
      state.detailedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        if (state.status !== "loading") return;

        state.status = "idle";

        const { books, total, addToBooks } = action.payload;

        if (addToBooks) state.books = state.books.concat(books);
        else state.books = books;

        state.total = total;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { detail, clearBooks } = booksSlice.actions;

export const selectBooks = (state: RootState) => state.books.books;
export const selectDetailedBook = (state: RootState) => state.books.detailedBook;
export const selectTotalBooks = (state: RootState) => state.books.total;
export const selectBooksStatus = (state: RootState) => state.books.status;

export default booksSlice.reducer;
