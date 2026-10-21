import type { ReactNode } from "react";
import type { OnRowsRendered, Props } from "./types";
import { useInfiniteLoader } from "./useInfiniteLoader";

export function InfiniteLoader({
  children,
  ...props
}: Props & {
  children: (params: { onRowsRendered: OnRowsRendered }) => ReactNode;
}) {
  const onRowsRendered = useInfiniteLoader(props);

  return children({ onRowsRendered });
}
