import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import booksSlice from "app/slices/books/booksSlice";
import searchSlice from "app/slices/search/searchSlice";

export const store = configureStore({
  reducer: {
    books: booksSlice,
    search: searchSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
