import { memo } from "react";
import type { VerseObject } from "~/types/bible";

interface VerseTextProps {
  verseNumber: number;
  verseObjects: VerseObject[];
  chapterNumber: number;
  bookId: string;
}

function VerseTextInner({
  verseNumber,
  verseObjects,
  chapterNumber,
  bookId,
}: VerseTextProps) {
  return (
    <span
      className="verse inline"
      id={`v${chapterNumber}-${verseNumber}`}
      data-book={bookId}
      data-chapter={chapterNumber}
      data-verse={verseNumber}
    >
      <sup
        className="mr-1 text-xs font-semibold text-verse-number select-none"
        aria-label={`verse ${verseNumber}`}
      >
        {verseNumber}
      </sup>
      {verseObjects.map((obj, index) => (
        <VerseObjectRenderer
          key={index}
          obj={obj}
        />
      ))}
    </span>
  );
}

const VerseText = memo(VerseTextInner);
export default VerseText;

interface VerseObjectRendererProps {
  obj: VerseObject;
}

function VerseObjectRenderer({ obj }: VerseObjectRendererProps) {
  switch (obj.type) {
    case "text":
      return <span>{obj.text.replace(/\n$/, "")}</span>;

    case "quote":
      return (
        <span
          className={
            obj.tag === "q2"
              ? "ml-8 block leading-relaxed"
              : "ml-4 block leading-relaxed"
          }
        >
          {obj.text?.replace(/\n$/, "")}
        </span>
      );

    case "paragraph":
      // Skip blank line markers and whitespace-only paragraph markers within verses
      if (obj.tag === "b" || obj.tag === "m" || obj.tag === "pmo") {
        return null;
      }
      if (obj.text) {
        const trimmed = obj.text.trim();
        if (!trimmed) return null;
        return <span>{trimmed}</span>;
      }
      return null;

    case "section":
      return null; // Sections are rendered at the chapter level

    case "footnote":
      return <FootnoteInline content={obj.content} />;

    default:
      return null;
  }
}

interface FootnoteInlineProps {
  content: string;
}

function FootnoteInline({ content }: FootnoteInlineProps) {
  // Parse footnote content: "+ \fr 1:3 \ft Cited in 2 Corinthians 4:6"
  const textMatch = content.match(/\\ft\s+(.+)/);
  const footnoteText = textMatch ? textMatch[1] : content;

  return (
    <span className="group relative inline">
      <button
        className="mx-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent hover:bg-accent/30 focus:outline-2 focus:outline-accent"
        type="button"
        aria-label={`Footnote: ${footnoteText}`}
        title={footnoteText}
      >
        †
      </button>
    </span>
  );
}
