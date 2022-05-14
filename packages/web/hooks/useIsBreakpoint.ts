import { useEffect, useState } from "react";

export const breakpoints = {
  base: 0,
  xs: 425,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * @desc returns true if min-width media query with the breakpoint argument is reached, else returns false
 */
export function useIsBreakpoint(breakpoint: Breakpoint) {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const width = breakpoints[breakpoint];
    const media = window.matchMedia(`(min-width: ${width}px)`);

    function handleChange(e: MediaQueryListEvent) {
      setTargetReached(e.matches);
    }

    media.addEventListener("change", handleChange);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", handleChange);
  }, []);

  return targetReached;
}
