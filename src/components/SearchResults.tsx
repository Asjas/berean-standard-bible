import { Link } from "@tanstack/react-router";
import type { SearchResult } from "~/types/bible";

interface SearchResultsProps {
  results: SearchResult[];
}

function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <ul className="mt-4 space-y-3">
      {results.map((result) => (
        <li key={result.id}>
          <Link
            className="block rounded-lg border border-border bg-card-bg p-4 transition-colors hover:bg-card-hover focus:outline-2 focus:outline-offset-2 focus:outline-accent"
            to="/book/$bookId"
            params={{ bookId: result.bookId }}
            hash={`v${result.chapter}-${result.verse}`}
          >
            <p className="text-sm font-semibold text-accent">
              {result.bookName} {result.chapter}:{result.verse}
            </p>
            <p className="mt-1 leading-relaxed text-text-primary">
              {result.text}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
