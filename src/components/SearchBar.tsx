interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
  isSearching?: boolean;
  resultCount?: number;
}

function SearchBar({
  query,
  onQueryChange,
  onClear,
  placeholder = "Search the Bible...",
  isSearching = false,
  resultCount,
}: SearchBarProps) {
  return (
    <div className="relative">
      <label
        className="sr-only"
        htmlFor="search-input"
      >
        Search
      </label>
      <input
        className="w-full rounded-lg border border-search-border bg-search-bg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
        id="search-input"
        type="search"
        role="searchbox"
        value={query}
        onChange={(e) => {
          onQueryChange(e.target.value);
        }}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {query && (
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 text-text-secondary hover:text-text-primary focus:outline-2 focus:outline-accent"
          type="button"
          onClick={onClear}
          aria-label="Clear search"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      )}
      {query && !isSearching && resultCount !== undefined && (
        <p
          className="mt-1 text-sm text-text-secondary"
          aria-live="polite"
        >
          {resultCount} {resultCount === 1 ? "result" : "results"} found
        </p>
      )}
      {isSearching && (
        <p
          className="mt-1 text-sm text-text-secondary"
          aria-live="polite"
        >
          Searching...
        </p>
      )}
    </div>
  );
}

export default SearchBar;
