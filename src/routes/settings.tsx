import { createFileRoute } from "@tanstack/react-router";
import Navigation from "~/components/Navigation";
import { useSettings } from "~/hooks/useSettings";
import type { AppSettings } from "~/types/bible";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

const FONT_OPTIONS: { value: AppSettings["fontFamily"]; label: string }[] = [
  { value: "Literata", label: "Literata" },
  { value: "Source Serif 4", label: "Source Serif 4" },
  { value: "Lora", label: "Lora" },
  { value: "system", label: "System Default" },
];

const THEME_OPTIONS: { value: AppSettings["theme"]; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function SettingsPage() {
  const { settings, updateSettings } = useSettings();

  return (
    <div>
      <Navigation
        title="Settings"
        showBack
      />
      <h1 className="mt-6 mb-8 text-2xl font-bold text-text-primary">
        Settings
      </h1>

      <div className="space-y-8">
        <fieldset>
          <legend className="mb-3 text-lg font-semibold text-text-primary">
            Theme
          </legend>
          <div className="flex gap-3">
            {THEME_OPTIONS.map((option) => (
              <button
                className={`rounded-lg border px-4 py-2 text-sm transition-colors focus:outline-2 focus:outline-accent ${
                  settings.theme === option.value
                    ? "border-accent bg-accent/10 font-semibold text-accent"
                    : "border-border text-text-secondary hover:bg-card-hover"
                }`}
                key={option.value}
                type="button"
                onClick={() => {
                  updateSettings({ theme: option.value });
                }}
                aria-pressed={settings.theme === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-lg font-semibold text-text-primary">
            Font Family
          </legend>
          <div className="flex flex-wrap gap-3">
            {FONT_OPTIONS.map((option) => (
              <button
                className={`rounded-lg border px-4 py-2 text-sm transition-colors focus:outline-2 focus:outline-accent ${
                  settings.fontFamily === option.value
                    ? "border-accent bg-accent/10 font-semibold text-accent"
                    : "border-border text-text-secondary hover:bg-card-hover"
                }`}
                key={option.value}
                type="button"
                onClick={() => {
                  updateSettings({ fontFamily: option.value });
                }}
                aria-pressed={settings.fontFamily === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label
            className="mb-3 block text-lg font-semibold text-text-primary"
            htmlFor="font-size"
          >
            Font Size: {settings.fontSize}px
          </label>
          <input
            className="w-full max-w-xs accent-accent"
            id="font-size"
            type="range"
            min="14"
            max="28"
            step="1"
            value={settings.fontSize}
            onChange={(e) => {
              updateSettings({ fontSize: Number(e.target.value) });
            }}
          />
          <div className="mt-1 flex max-w-xs justify-between text-xs text-text-secondary">
            <span>14px</span>
            <span>28px</span>
          </div>
        </div>

        <div>
          <label
            className="mb-3 block text-lg font-semibold text-text-primary"
            htmlFor="line-height"
          >
            Line Height: {settings.lineHeight.toFixed(1)}
          </label>
          <input
            className="w-full max-w-xs accent-accent"
            id="line-height"
            type="range"
            min="1.4"
            max="2.2"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => {
              updateSettings({ lineHeight: Number(e.target.value) });
            }}
          />
          <div className="mt-1 flex max-w-xs justify-between text-xs text-text-secondary">
            <span>1.4</span>
            <span>2.2</span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card-bg p-4">
          <h2 className="mb-2 text-sm font-semibold text-text-secondary">
            Preview
          </h2>
          <p className="leading-relaxed text-text-primary">
            In the beginning God created the heavens and the earth. Now the
            earth was formless and void, and darkness was over the surface of
            the deep. And the Spirit of God was hovering over the surface of the
            waters.
          </p>
        </div>
      </div>
    </div>
  );
}
