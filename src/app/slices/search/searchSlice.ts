import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "app/store";

export interface ISearchState {
  search: string;
  category: string;
  sorting: string;
  pages: number;
}

const initialState: ISearchState = {
  search: "",
  category: "all",
  sorting: "relevance",
  pages: 0,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    setPages: (state, action: PayloadAction<number>) => {
      state.pages = action.payload;
    },
  },
});

export const { setSearch, setCategory, setSorting, setPages } = searchSlice.actions;

export const selectSearchInfo = (state: RootState) => state.search;
export const selectLoadedPages = (state: RootState) => state.search.pages;

export default searchSlice.reducer;
