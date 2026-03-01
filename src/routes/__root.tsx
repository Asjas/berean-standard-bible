import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import ThemeToggle from "~/components/ThemeToggle";
import { useBibleData } from "~/hooks/useBibleData";
import { useSettings } from "~/hooks/useSettings";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isLoading, error, isSearchReady } = useBibleData();
  const { settings, updateSettings } = useSettings();

  return (
    <div className="min-h-dvh bg-bg-primary text-text-primary">
      <header className="sticky top-0 z-10 border-b border-border bg-bg-primary/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link
            className="text-lg font-bold text-accent transition-colors hover:text-accent-hover"
            to="/"
          >
            Berean Standard Bible
          </Link>
          <nav
            className="flex items-center gap-2"
            aria-label="Main navigation"
          >
            <Link
              className="rounded-lg border border-border px-3 py-2 text-sm text-text-primary transition-colors hover:bg-card-hover focus:outline-2 focus:outline-accent"
              to="/settings"
              aria-label="Settings"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
            <ThemeToggle
              theme={settings.theme}
              onToggle={(theme) => {
                updateSettings({ theme });
              }}
            />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {isLoading && (
          <div
            className="flex flex-col items-center justify-center py-20"
            role="status"
            aria-label="Loading Bible data"
          >
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent" />
            <p className="text-text-secondary">Loading Bible data...</p>
          </div>
        )}
        {error && (
          <div
            className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
            role="alert"
          >
            <p className="font-semibold">Error loading Bible data</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}
        {!isLoading && !error && <Outlet />}
      </main>

      {!isSearchReady && !isLoading && (
        <div
          className="fixed right-4 bottom-4 rounded-lg bg-card-bg px-3 py-2 text-xs text-text-secondary shadow-lg"
          aria-live="polite"
        >
          Building search index...
        </div>
      )}
    </div>
  );
}
