import { create, insertMultiple, search } from "@orama/orama";
import type { Orama } from "@orama/orama";
import type { IndexedVerse, SearchResult } from "~/types/bible";

const SCHEMA = {
  bookId: "string",
  bookName: "string",
  chapter: "number",
  verse: "number",
  text: "string",
} as const;

type SearchIndex = Orama<typeof SCHEMA>;

/** Module-level search index — persists for app lifetime */
let searchIndex: SearchIndex | null = null;

/** Build the search index from flattened verses */
export async function buildSearchIndex(verses: IndexedVerse[]): Promise<void> {
  searchIndex = create({ schema: SCHEMA });

  // Insert in batches to avoid blocking the main thread
  const BATCH_SIZE = 5000;
  for (let i = 0; i < verses.length; i += BATCH_SIZE) {
    const batch = verses.slice(i, i + BATCH_SIZE);
    await insertMultiple(searchIndex, batch);
    // Yield to the event loop between batches
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  }
}

/** Search the index and return formatted results */
export async function searchVerses(
  query: string,
  limit = 50,
): Promise<SearchResult[]> {
  if (!searchIndex || !query.trim()) return [];

  const results = await search(searchIndex, {
    term: query,
    limit,
    properties: ["text"],
  });

  return results.hits.map((hit) => ({
    id: hit.id,
    bookId: hit.document.bookId,
    bookName: hit.document.bookName,
    chapter: hit.document.chapter,
    verse: hit.document.verse,
    text: hit.document.text,
    score: hit.score,
  }));
}

/** Check if the search index has been built */
export function isSearchReady(): boolean {
  return searchIndex !== null;
}
