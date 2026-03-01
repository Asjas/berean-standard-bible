import { useCallback, useEffect, useState } from "react";
import {
  applyAllSettings,
  applyTheme,
  loadSettings,
  saveSettings,
} from "~/lib/settings";
import type { AppSettings } from "~/types/bible";

/** Hook for managing app settings with localStorage persistence */
export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);

  // Apply settings to DOM on mount and when they change
  useEffect(() => {
    applyAllSettings(settings);
  }, [settings]);

  // Listen for system theme changes when theme is "system"
  useEffect(() => {
    if (settings.theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handler);
    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [settings.theme]);

  const updateSettings = useCallback(
    (updates: Partial<AppSettings>) => {
      const newSettings = { ...settings, ...updates };
      setSettings(newSettings);
      saveSettings(newSettings);
    },
    [settings],
  );

  return { settings, updateSettings };
}
