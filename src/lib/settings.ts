import type { AppSettings } from "~/types/bible";

const SETTINGS_KEY = "bsb-settings";

const DEFAULT_SETTINGS: AppSettings = {
  theme: "system",
  fontFamily: "Literata",
  fontSize: 18,
  lineHeight: 1.8,
};

/** Read settings from localStorage, falling back to defaults */
export function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return { ...DEFAULT_SETTINGS };

    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) {
      return { ...DEFAULT_SETTINGS };
    }

    return { ...DEFAULT_SETTINGS, ...(parsed as Partial<AppSettings>) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/** Save settings to localStorage */
export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

/** Apply theme class to document */
export function applyTheme(theme: AppSettings["theme"]): void {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (theme === "dark" || (theme === "system" && prefersDark)) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

/** Apply font settings to CSS custom properties */
export function applyFontSettings(settings: AppSettings): void {
  const root = document.documentElement;

  const fontMap: Record<AppSettings["fontFamily"], string> = {
    "Literata": '"Literata", Georgia, "Times New Roman", serif',
    "Source Serif 4": '"Source Serif 4", Georgia, "Times New Roman", serif',
    "Lora": '"Lora", Georgia, "Times New Roman", serif',
    "system":
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  root.style.setProperty("--font-reading", fontMap[settings.fontFamily]);
  root.style.setProperty("--font-size-base", `${settings.fontSize}px`);
  root.style.setProperty("--line-height-base", `${settings.lineHeight}`);
}

/** Apply all settings to the DOM */
export function applyAllSettings(settings: AppSettings): void {
  applyTheme(settings.theme);
  applyFontSettings(settings);
}

export { DEFAULT_SETTINGS };
