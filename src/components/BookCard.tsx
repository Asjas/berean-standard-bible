import { Link } from "@tanstack/react-router";
import type { BibleBook } from "~/types/bible";

interface BookCardProps {
  book: BibleBook;
}

function BookCard({ book }: BookCardProps) {
  return (
    <Link
      className="block rounded-lg border border-border bg-card-bg p-4 transition-colors hover:bg-card-hover focus:outline-2 focus:outline-offset-2 focus:outline-accent"
      to="/book/$bookId"
      params={{ bookId: book.id }}
    >
      <h3 className="text-base font-semibold text-text-primary">{book.name}</h3>
      <p className="mt-1 text-sm text-text-secondary">
        {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
      </p>
    </Link>
  );
}

export default BookCard;
