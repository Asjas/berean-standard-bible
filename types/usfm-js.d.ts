declare module "usfm-js" {
  interface UsfmJsonOutput {
    headers: { tag: string; content: string }[];
    chapters: Record<string, Record<string, { verseObjects: unknown[] }>>;
  }

  function toJSON(usfmText: string): UsfmJsonOutput;
  function toUSFM(jsonData: UsfmJsonOutput): string;
  function removeMarker(text: string): string;

  export default { toJSON, toUSFM, removeMarker };
}
