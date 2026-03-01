import { useCallback, useEffect, useRef, useState } from "react";
import { searchVerses } from "~/lib/search";
import type { SearchResult } from "~/types/bible";

interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
}

/** Hook for debounced full-text search */
export function useSearch(isSearchReady: boolean) {
  const [state, setState] = useState<SearchState>({
    query: "",
    results: [],
    isSearching: false,
  });
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const setQuery = useCallback(
    (query: string) => {
      setState((prev) => ({ ...prev, query, isSearching: query.length > 0 }));

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      if (!query.trim()) {
        setState((prev) => ({
          ...prev,
          results: [],
          isSearching: false,
        }));
        return;
      }

      if (!isSearchReady) return;

      debounceTimer.current = setTimeout(async () => {
        const results = await searchVerses(query);
        setState((prev) => ({ ...prev, results, isSearching: false }));
      }, 300);
    },
    [isSearchReady],
  );

  const clearSearch = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    setState({ query: "", results: [], isSearching: false });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return { ...state, setQuery, clearSearch };
}
