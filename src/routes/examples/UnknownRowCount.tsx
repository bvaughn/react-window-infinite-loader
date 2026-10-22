import type { ReactElement } from "react";
import { List } from "react-window";
import { useInfiniteLoader } from "react-window-infinite-loader";

declare function isRowLoaded(index: number): boolean;
declare function loadMoreRows(
  startIndex: number,
  stopIndex: number
): Promise<void>;
declare function RowComponent(): ReactElement;

// <begin>

function Example({
  hasNextPage,
  rows
}: {
  hasNextPage: boolean;
  rows: string[];
}) {
  // Render an extra row while more rows are available;
  // scrolling it into view will trigger loading the next page
  const rowCount = hasNextPage ? rows.length + 1 : rows.length;

  const onRowsRendered = useInfiniteLoader({
    isRowLoaded,
    loadMoreRows,
    rowCount
  });

  return (
    <List
      onRowsRendered={onRowsRendered}
      rowComponent={RowComponent}
      rowCount={rowCount}
      rowHeight={25}
      rowProps={{ rows }}
    />
  );
}

// <end>

export { Example };
