import usfm from "usfm-js";
import { BIBLE_BOOKS } from "~/lib/bible-data";
import type {
  BibleBook,
  IndexedVerse,
  LoadedBook,
  ParsedChapter,
  UsfmJson,
  VerseObject,
} from "~/types/bible";

/** Module-level cache for parsed books — persists for app lifetime */
const bookCache = new Map<string, LoadedBook>();

/** Parse raw USFM text into structured JSON */
function parseUsfm(rawText: string): UsfmJson {
  return usfm.toJSON(rawText) as UsfmJson;
}

/** Fetch and parse a single USFM file */
async function fetchAndParseBook(book: BibleBook): Promise<LoadedBook> {
  const cached = bookCache.get(book.id);
  if (cached) return cached;

  const response = await fetch(`/bsb_usfm/${book.fileName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${book.fileName}: ${response.status}`);
  }

  const rawText = await response.text();
  const parsed = parseUsfm(rawText);

  const loadedBook: LoadedBook = {
    book,
    headers: parsed.headers,
    chapters: parsed.chapters,
  };

  bookCache.set(book.id, loadedBook);
  return loadedBook;
}

/** Fetch and parse all 66 books in parallel */
export async function fetchAllBooks(): Promise<LoadedBook[]> {
  const results = await Promise.allSettled(
    BIBLE_BOOKS.map((book) => fetchAndParseBook(book)),
  );

  const books: LoadedBook[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      books.push(result.value);
    } else {
      console.error("Failed to load book:", result.reason);
    }
  }

  return books;
}

/** Fetch and parse a single book by ID */
export async function fetchBook(bookId: string): Promise<LoadedBook | null> {
  const book = BIBLE_BOOKS.find((b) => b.id === bookId);
  if (!book) return null;

  return fetchAndParseBook(book);
}

/** Extract plain text from verse objects (strips formatting) */
export function extractVerseText(verseObjects: VerseObject[]): string {
  const parts: string[] = [];

  for (const obj of verseObjects) {
    switch (obj.type) {
      case "text":
        parts.push(obj.text.trim());
        break;
      case "quote":
        if (obj.text) parts.push(obj.text.trim());
        break;
      case "paragraph":
        if (obj.text) parts.push(obj.text.trim());
        break;
      // footnotes and sections are not included in plain text
    }
  }

  return parts.filter(Boolean).join(" ");
}

/** Flatten all verses from a loaded book into indexable records */
export function flattenBookVerses(loadedBook: LoadedBook): IndexedVerse[] {
  const verses: IndexedVerse[] = [];

  for (const [chapterNum, chapter] of Object.entries(loadedBook.chapters)) {
    for (const [verseNum, verse] of Object.entries(chapter as ParsedChapter)) {
      const text = extractVerseText(verse.verseObjects);
      if (text) {
        verses.push({
          id: `${loadedBook.book.id}.${chapterNum}.${verseNum}`,
          bookId: loadedBook.book.id,
          bookName: loadedBook.book.name,
          chapter: Number(chapterNum),
          verse: Number(verseNum),
          text,
        });
      }
    }
  }

  return verses;
}

/** Flatten all loaded books into indexable verse records */
export function flattenAllVerses(books: LoadedBook[]): IndexedVerse[] {
  return books.flatMap(flattenBookVerses);
}

/** Get the number of chapters in a book's parsed data */
export function getChapterCount(
  chapters: Record<string, ParsedChapter>,
): number {
  return Object.keys(chapters).length;
}

/** Clear the book cache (if ever needed) */
export function clearBookCache(): void {
  bookCache.clear();
}
