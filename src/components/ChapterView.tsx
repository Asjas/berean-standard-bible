import VerseText from "~/components/VerseText";
import type { ParsedChapter } from "~/types/bible";

interface ChapterViewProps {
  bookId: string;
  chapterNumber: number;
  chapter: ParsedChapter;
}

function ChapterView({ bookId, chapterNumber, chapter }: ChapterViewProps) {
  // Separate front matter from actual verses
  const frontMatter = chapter["front"];
  const verseEntries = Object.entries(chapter)
    .filter(([key]) => key !== "front")
    .sort(([a], [b]) => Number(a) - Number(b));

  // Collect section headings from all verse objects (including front matter)
  const sections = extractSections(chapter);

  return (
    <section
      className="mb-12"
      id={`chapter-${chapterNumber}`}
      aria-label={`Chapter ${chapterNumber}`}
    >
      <h2 className="mb-6 border-b border-border pb-2 text-2xl font-bold text-text-primary">
        Chapter {chapterNumber}
      </h2>

      {/* Render front matter sections (headings before verse 1) */}
      {frontMatter &&
        sections.get("front")?.map((section, i) => (
          <SectionHeading
            key={`front-s-${i}`}
            tag={section.tag}
            content={section.content}
          />
        ))}

      {verseEntries.map(([verseNum, verse]) => {
        const sectionHeadings = sections.get(verseNum);
        return (
          <span key={verseNum}>
            {sectionHeadings?.map((section, i) => (
              <SectionHeading
                key={`${verseNum}-s-${i}`}
                tag={section.tag}
                content={section.content}
              />
            ))}
            <VerseText
              verseNumber={Number(verseNum)}
              verseObjects={verse.verseObjects}
              chapterNumber={chapterNumber}
              bookId={bookId}
            />
          </span>
        );
      })}
    </section>
  );
}

export default ChapterView;

interface SectionInfo {
  tag: string;
  content: string;
}

/** Extract section headings and cross-references from verse objects, keyed by the verse they belong to */
function extractSections(chapter: ParsedChapter): Map<string, SectionInfo[]> {
  const sections = new Map<string, SectionInfo[]>();

  for (const [verseNum, verse] of Object.entries(chapter)) {
    const verseSections: SectionInfo[] = [];

    for (const obj of verse.verseObjects) {
      if (obj.type === "section") {
        verseSections.push({
          tag: obj.tag,
          content: obj.content.replace(/\n$/, ""),
        });
      }
    }

    // Also check for untyped cross-reference entries (tag:"r" without type:"section")
    // which usfm-js emits in front matter
    for (const raw of verse.verseObjects as unknown[]) {
      const entry = raw as Record<string, unknown>;
      if (
        entry["tag"] === "r" &&
        !entry["type"] &&
        typeof entry["content"] === "string"
      ) {
        verseSections.push({
          tag: "r",
          content: entry["content"].replace(/\n$/, ""),
        });
      }
    }

    if (verseSections.length > 0) {
      sections.set(verseNum, verseSections);
    }
  }

  return sections;
}

interface SectionHeadingProps {
  tag: string;
  content: string;
}

function SectionHeading({ tag, content }: SectionHeadingProps) {
  switch (tag) {
    case "ms":
      return (
        <h3 className="mt-10 mb-4 text-center text-xl font-bold tracking-wide text-accent uppercase">
          {content}
        </h3>
      );
    case "mr":
      return (
        <p className="mb-6 text-center text-sm text-text-secondary italic">
          {content}
        </p>
      );
    case "s1":
      return (
        <h4 className="mt-8 mb-3 text-lg font-semibold text-text-primary">
          {content}
        </h4>
      );
    case "s2":
      return (
        <h5 className="mt-6 mb-2 text-base font-medium text-text-secondary">
          {content}
        </h5>
      );
    case "r":
      return (
        <p className="mb-4 text-sm text-text-secondary italic">{content}</p>
      );
    default:
      return <p className="mb-2 font-medium text-text-secondary">{content}</p>;
  }
}
