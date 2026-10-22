import { useInfiniteLoader } from "../hooks/useInfiniteLoader";
import type { InfiniteLoaderProps } from "../types";

/**
 * Loads rows as they are scrolled into view; a render prop alternative to the `useInfiniteLoader` hook.
 */
export function InfiniteLoader({ children, ...props }: InfiniteLoaderProps) {
  const onRowsRendered = useInfiniteLoader(props);

  return children({ onRowsRendered });
}
