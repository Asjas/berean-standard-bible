import type { BibleBook, Testament } from "~/types/bible";

type BookDef = [
  id: string,
  name: string,
  abbreviation: string,
  testament: Testament,
  chapters: number,
  fileName: string,
];

const BOOK_DEFS: BookDef[] = [
  // Old Testament
  ["GEN", "Genesis", "Gen", "OT", 50, "01GENBSB.SFM"],
  ["EXO", "Exodus", "Exod", "OT", 40, "02EXOBSB.SFM"],
  ["LEV", "Leviticus", "Lev", "OT", 27, "03LEVBSB.SFM"],
  ["NUM", "Numbers", "Num", "OT", 36, "04NUMBSB.SFM"],
  ["DEU", "Deuteronomy", "Deut", "OT", 34, "05DEUBSB.SFM"],
  ["JOS", "Joshua", "Josh", "OT", 24, "06JOSBSB.SFM"],
  ["JDG", "Judges", "Judg", "OT", 21, "07JDGBSB.SFM"],
  ["RUT", "Ruth", "Ruth", "OT", 4, "08RUTBSB.SFM"],
  ["1SA", "1 Samuel", "1 Sam", "OT", 31, "091SABSB.SFM"],
  ["2SA", "2 Samuel", "2 Sam", "OT", 24, "102SABSB.SFM"],
  ["1KI", "1 Kings", "1 Kgs", "OT", 22, "111KIBSB.SFM"],
  ["2KI", "2 Kings", "2 Kgs", "OT", 25, "122KIBSB.SFM"],
  ["1CH", "1 Chronicles", "1 Chr", "OT", 29, "131CHBSB.SFM"],
  ["2CH", "2 Chronicles", "2 Chr", "OT", 36, "142CHBSB.SFM"],
  ["EZR", "Ezra", "Ezra", "OT", 10, "15EZRBSB.SFM"],
  ["NEH", "Nehemiah", "Neh", "OT", 13, "16NEHBSB.SFM"],
  ["EST", "Esther", "Esth", "OT", 10, "17ESTBSB.SFM"],
  ["JOB", "Job", "Job", "OT", 42, "18JOBBSB.SFM"],
  ["PSA", "Psalms", "Ps", "OT", 150, "19PSABSB.SFM"],
  ["PRO", "Proverbs", "Prov", "OT", 31, "20PROBSB.SFM"],
  ["ECC", "Ecclesiastes", "Eccl", "OT", 12, "21ECCBSB.SFM"],
  ["SNG", "Song of Solomon", "Song", "OT", 8, "22SNGBSB.SFM"],
  ["ISA", "Isaiah", "Isa", "OT", 66, "23ISABSB.SFM"],
  ["JER", "Jeremiah", "Jer", "OT", 52, "24JERBSB.SFM"],
  ["LAM", "Lamentations", "Lam", "OT", 5, "25LAMBSB.SFM"],
  ["EZK", "Ezekiel", "Ezek", "OT", 48, "26EZKBSB.SFM"],
  ["DAN", "Daniel", "Dan", "OT", 12, "27DANBSB.SFM"],
  ["HOS", "Hosea", "Hos", "OT", 14, "28HOSBSB.SFM"],
  ["JOL", "Joel", "Joel", "OT", 3, "29JOLBSB.SFM"],
  ["AMO", "Amos", "Amos", "OT", 9, "30AMOBSB.SFM"],
  ["OBA", "Obadiah", "Obad", "OT", 1, "31OBABSB.SFM"],
  ["JON", "Jonah", "Jonah", "OT", 4, "32JONBSB.SFM"],
  ["MIC", "Micah", "Mic", "OT", 7, "33MICBSB.SFM"],
  ["NAM", "Nahum", "Nah", "OT", 3, "34NAMBSB.SFM"],
  ["HAB", "Habakkuk", "Hab", "OT", 3, "35HABBSB.SFM"],
  ["ZEP", "Zephaniah", "Zeph", "OT", 3, "36ZEPBSB.SFM"],
  ["HAG", "Haggai", "Hag", "OT", 2, "37HAGBSB.SFM"],
  ["ZEC", "Zechariah", "Zech", "OT", 14, "38ZECBSB.SFM"],
  ["MAL", "Malachi", "Mal", "OT", 4, "39MALBSB.SFM"],
  // New Testament
  ["MAT", "Matthew", "Matt", "NT", 28, "41MATBSB.SFM"],
  ["MRK", "Mark", "Mark", "NT", 16, "42MRKBSB.SFM"],
  ["LUK", "Luke", "Luke", "NT", 24, "43LUKBSB.SFM"],
  ["JHN", "John", "John", "NT", 21, "44JHNBSB.SFM"],
  ["ACT", "Acts", "Acts", "NT", 28, "45ACTBSB.SFM"],
  ["ROM", "Romans", "Rom", "NT", 16, "46ROMBSB.SFM"],
  ["1CO", "1 Corinthians", "1 Cor", "NT", 16, "471COBSB.SFM"],
  ["2CO", "2 Corinthians", "2 Cor", "NT", 13, "482COBSB.SFM"],
  ["GAL", "Galatians", "Gal", "NT", 6, "49GALBSB.SFM"],
  ["EPH", "Ephesians", "Eph", "NT", 6, "50EPHBSB.SFM"],
  ["PHP", "Philippians", "Phil", "NT", 4, "51PHPBSB.SFM"],
  ["COL", "Colossians", "Col", "NT", 4, "52COLBSB.SFM"],
  ["1TH", "1 Thessalonians", "1 Thess", "NT", 5, "531THBSB.SFM"],
  ["2TH", "2 Thessalonians", "2 Thess", "NT", 3, "542THBSB.SFM"],
  ["1TI", "1 Timothy", "1 Tim", "NT", 6, "551TIBSB.SFM"],
  ["2TI", "2 Timothy", "2 Tim", "NT", 4, "562TIBSB.SFM"],
  ["TIT", "Titus", "Titus", "NT", 3, "57TITBSB.SFM"],
  ["PHM", "Philemon", "Phlm", "NT", 1, "58PHMBSB.SFM"],
  ["HEB", "Hebrews", "Heb", "NT", 13, "59HEBBSB.SFM"],
  ["JAS", "James", "Jas", "NT", 5, "60JASBSB.SFM"],
  ["1PE", "1 Peter", "1 Pet", "NT", 5, "611PEBSB.SFM"],
  ["2PE", "2 Peter", "2 Pet", "NT", 3, "622PEBSB.SFM"],
  ["1JN", "1 John", "1 John", "NT", 5, "631JNBSB.SFM"],
  ["2JN", "2 John", "2 John", "NT", 1, "642JNBSB.SFM"],
  ["3JN", "3 John", "3 John", "NT", 1, "653JNBSB.SFM"],
  ["JUD", "Jude", "Jude", "NT", 1, "66JUDBSB.SFM"],
  ["REV", "Revelation", "Rev", "NT", 22, "67REVBSB.SFM"],
];

/** All 66 books in canonical order */
export const BIBLE_BOOKS: BibleBook[] = BOOK_DEFS.map(
  ([id, name, abbreviation, testament, chapters, fileName], index) => ({
    id,
    name,
    abbreviation,
    testament,
    order: index + 1,
    chapters,
    fileName,
  }),
);

/** Lookup a book by its ID (e.g., "GEN", "REV") */
export function getBookById(bookId: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === bookId);
}

/** Get all Old Testament books */
export function getOldTestamentBooks(): BibleBook[] {
  return BIBLE_BOOKS.filter((b) => b.testament === "OT");
}

/** Get all New Testament books */
export function getNewTestamentBooks(): BibleBook[] {
  return BIBLE_BOOKS.filter((b) => b.testament === "NT");
}

/** Total number of books */
export const TOTAL_BOOKS = BIBLE_BOOKS.length;
