import type { OnRowsRendered, Props } from "./types";
import { useInfiniteLoader } from "./useInfiniteLoader";

export function InfiniteLoader({
  children,
  ...props
}: Props & {
  children: (paras: { onRowsRendered: OnRowsRendered }) => void;
}) {
  const onRowsRendered = useInfiniteLoader(props);

  return children({ onRowsRendered });
}
