import { useCallback, useEffect, useRef, useState } from "react";
import { buildSearchIndex } from "~/lib/search";
import { fetchAllBooks, flattenAllVerses } from "~/lib/usfm";
import type { LoadedBook } from "~/types/bible";

interface BibleDataState {
  books: LoadedBook[];
  isLoading: boolean;
  isSearchReady: boolean;
  error: string | null;
}

/** Hook that fetches all USFM books on mount and builds the search index */
export function useBibleData() {
  const [state, setState] = useState<BibleDataState>({
    books: [],
    isLoading: true,
    isSearchReady: false,
    error: null,
  });
  const initialized = useRef(false);

  const loadData = useCallback(async () => {
    try {
      const books = await fetchAllBooks();
      setState((prev) => ({ ...prev, books, isLoading: false }));

      // Build search index asynchronously after books are loaded
      const verses = flattenAllVerses(books);
      await buildSearchIndex(verses);
      setState((prev) => ({ ...prev, isSearchReady: true }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Failed to load Bible data",
      }));
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    void loadData();
  }, [loadData]);

  return state;
}
