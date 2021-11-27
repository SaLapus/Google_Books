import { IBook } from "./booksSlice";

import { ISearchState } from "app/slices/search/searchSlice";

export function fetchBooks(searchParams: ISearchState) {
  return new Promise<{ total: number; books: IBook[]; pages: number }>(async (resolve, reject) => {
    try {
      let timeout = false;
      const timer = setTimeout(() => {
        timeout = true;
      }, 5 * 1000);

      let totalPages = 0;
      let fetchedBooks: IBook[] = [];
      let total = 0;
      const multiplicity = 30;

      do {
        const { booksTotal, books } = await requestBooks(
          searchParams,
          multiplicity - fetchedBooks.length
        );

        total = booksTotal;

        const newBooks = books
          .filter((book: IBook) => {
            if (searchParams.category === "all") return true;

            if (book.categories)
              return book.categories.map((c) => c.toLowerCase()).includes(searchParams.category);
            else false;
          })
          .slice(0, multiplicity - fetchedBooks.length);

        totalPages += books.length;
        fetchedBooks = fetchedBooks.concat(newBooks);
      } while (fetchedBooks.length < multiplicity && !timeout);

      clearTimeout(timer);
      resolve({ total, books: fetchedBooks, pages: totalPages });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

async function requestBooks({ pages, search, sorting }: ISearchState, multiplicity: number) {
  const params = new URLSearchParams({
    q: search,
    startIndex: `${pages}`,
    maxResults: `${multiplicity}`,
    orderBy: sorting,
    key: `${process.env.API_KEY}`,
  });

  const URL = `https://www.googleapis.com/books/v1/volumes`;

  const res = await fetch(`${URL}?${params}`);

  const data = await res.json();

  const booksTotal = data.totalItems;
  const books: IBook[] = data.items
    .map((book: any) => book.volumeInfo)
    .map((book: any) => {
      return {
        title: book.title,
        authors: book.authors,
        categories: book.categories,
        description: book.description,
        pages: book.pageCount,
        cover: book.imageLinks?.thumbnail,
      };
    });

  return { booksTotal, books };
}
