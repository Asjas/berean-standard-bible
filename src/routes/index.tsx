import { createFileRoute } from "@tanstack/react-router";
import BookCard from "~/components/BookCard";
import SearchBar from "~/components/SearchBar";
import SearchResults from "~/components/SearchResults";
import { useSearch } from "~/hooks/useSearch";
import { getNewTestamentBooks, getOldTestamentBooks } from "~/lib/bible-data";
import { isSearchReady } from "~/lib/search";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const otBooks = getOldTestamentBooks();
  const ntBooks = getNewTestamentBooks();
  const search = useSearch(isSearchReady());

  return (
    <div>
      <section
        className="mb-8"
        aria-label="Search"
      >
        <SearchBar
          query={search.query}
          onQueryChange={search.setQuery}
          onClear={search.clearSearch}
          placeholder="Search the entire Bible..."
          isSearching={search.isSearching}
          resultCount={search.results.length}
        />
        {search.query && <SearchResults results={search.results} />}
      </section>

      {!search.query && (
        <>
          <section aria-labelledby="ot-heading">
            <h2
              className="mb-4 border-b border-border pb-2 text-xl font-bold text-text-primary"
              id="ot-heading"
            >
              Old Testament
            </h2>
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {otBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="nt-heading">
            <h2
              className="mb-4 border-b border-border pb-2 text-xl font-bold text-text-primary"
              id="nt-heading"
            >
              New Testament
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {ntBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
