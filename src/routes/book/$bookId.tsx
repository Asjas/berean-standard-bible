import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ChapterView from "~/components/ChapterView";
import { getBookById } from "~/lib/bible-data";
import { fetchBook } from "~/lib/usfm";
import type { LoadedBook } from "~/types/bible";

export const Route = createFileRoute("/book/$bookId")({
  component: BookPage,
});

function BookPage() {
  const { bookId } = Route.useParams();
  const bookMeta = getBookById(bookId);
  const [loadedBook, setLoadedBook] = useState<LoadedBook | null>(null);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  // Scroll to verse hash after content loads
  useEffect(() => {
    if (!loadedBook || !location.hash) return;
    const id = location.hash.replace(/^#/, "");
    // Delay to let the DOM render
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("bg-accent/10");
        setTimeout(() => {
          el.classList.remove("bg-accent/10");
        }, 2000);
      }
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [loadedBook, location.hash]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const result = await fetchBook(bookId);
      if (cancelled) return;

      if (!result) {
        setError(`Book "${bookId}" not found`);
        return;
      }
      setLoadedBook(result);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [bookId]);

  if (!bookMeta) {
    return (
      <p className="mt-8 text-center text-text-secondary">
        Book not found: {bookId}
      </p>
    );
  }

  if (error) {
    return (
      <div
        className="mt-8 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
        role="alert"
      >
        <p>{error}</p>
      </div>
    );
  }

  if (!loadedBook) {
    return (
      <div
        className="flex items-center justify-center py-20"
        role="status"
        aria-label={`Loading ${bookMeta.name}`}
      >
        <div className="mr-3 h-6 w-6 animate-spin rounded-full border-4 border-border border-t-accent" />
        <p className="text-text-secondary">Loading {bookMeta.name}...</p>
      </div>
    );
  }

  const chapterEntries = Object.entries(loadedBook.chapters).sort(
    ([a], [b]) => Number(a) - Number(b),
  );

  return (
    <article>
      <h1 className="mb-8 text-3xl font-bold text-text-primary">
        {bookMeta.name}
      </h1>

      {chapterEntries.map(([chapterNum, chapter]) => (
        <ChapterView
          key={chapterNum}
          bookId={bookId}
          chapterNumber={Number(chapterNum)}
          chapter={chapter}
        />
      ))}
    </article>
  );
}
