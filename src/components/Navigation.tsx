import { Link, useRouter } from "@tanstack/react-router";

interface NavigationProps {
  title?: string;
  showBack?: boolean;
}

function Navigation({ title, showBack = false }: NavigationProps) {
  const router = useRouter();

  return (
    <nav
      className="flex items-center gap-3"
      aria-label="Breadcrumb"
    >
      {showBack && (
        <button
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-card-hover hover:text-text-primary focus:outline-2 focus:outline-accent"
          type="button"
          onClick={() => {
            router.history.back();
          }}
          aria-label="Go back"
        >
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <Link
        className="text-sm text-text-secondary transition-colors hover:text-accent"
        to="/"
      >
        Home
      </Link>
      {title && (
        <>
          <span
            className="text-text-secondary"
            aria-hidden="true"
          >
            /
          </span>
          <span className="text-sm font-medium text-text-primary">{title}</span>
        </>
      )}
    </nav>
  );
}

export default Navigation;
