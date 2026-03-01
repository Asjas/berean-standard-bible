import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<ScrollDirection>("up");
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        setIsAtTop(currentScrollY < threshold);

        if (Math.abs(currentScrollY - lastScrollY.current) >= threshold) {
          setDirection(currentScrollY > lastScrollY.current ? "down" : "up");
          lastScrollY.current = currentScrollY;
        }

        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { direction, isAtTop };
}

export default useScrollDirection;
