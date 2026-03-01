/**
 * TypeScript types for parsed Bible data.
 */

/** A single verse object from usfm-js parsing */
export type VerseObject =
  | VerseTextObject
  | VerseParagraphObject
  | VerseSectionObject
  | VerseFootnoteObject
  | VerseQuoteObject
  | VerseUntypedObject;

export interface VerseTextObject {
  type: "text";
  text: string;
}

export interface VerseParagraphObject {
  type: "paragraph";
  tag: "b" | "m" | "pmo" | "p";
  text?: string;
  nextChar?: string;
}

export interface VerseSectionObject {
  type: "section";
  tag: "s1" | "s2" | "ms" | "mr" | "r";
  content: string;
}

export interface VerseFootnoteObject {
  type: "footnote";
  tag: "f";
  content: string;
  endTag: string;
  nextChar?: string;
}

export interface VerseQuoteObject {
  type: "quote";
  tag: "q1" | "q2";
  text?: string;
  nextChar?: string;
}

/**
 * Catch-all for usfm-js objects emitted without a `type` field.
 * Known tags: li1, li2, d, r, ms, mr, it, pc
 */
export interface VerseUntypedObject {
  type?: undefined;
  tag: string;
  content?: string;
  text?: string;
  endTag?: string;
  nextChar?: string;
}

/** Parsed verse data with its objects */
export interface ParsedVerse {
  verseObjects: VerseObject[];
}

/** A chapter is a record of verse numbers to parsed verse data */
export type ParsedChapter = Record<string, ParsedVerse>;

/** Headers from a USFM file */
export interface UsfmHeader {
  tag: string;
  content: string;
}

/** Raw usfm-js JSON output */
export interface UsfmJson {
  headers: UsfmHeader[];
  chapters: Record<string, ParsedChapter>;
}

/** Testament grouping */
export type Testament = "OT" | "NT";

/** Book metadata for navigation and display */
export interface BibleBook {
  id: string;
  name: string;
  abbreviation: string;
  testament: Testament;
  order: number;
  chapters: number;
  fileName: string;
}

/** A fully loaded book with parsed chapter/verse data */
export interface LoadedBook {
  book: BibleBook;
  headers: UsfmHeader[];
  chapters: Record<string, ParsedChapter>;
}

/** Flattened verse for search indexing */
export interface IndexedVerse {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

/** Search result from Orama */
export interface SearchResult {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  score: number;
}

/** User settings persisted in localStorage */
export interface AppSettings {
  theme: "light" | "dark" | "system";
  fontFamily: "Literata" | "Source Serif 4" | "Lora" | "system";
  fontSize: number;
  lineHeight: number;
}
