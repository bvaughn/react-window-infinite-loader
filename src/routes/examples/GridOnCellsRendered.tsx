import type { ReactElement } from "react";
import { Grid } from "react-window";
import { useInfiniteLoader } from "react-window-infinite-loader";

declare function isRowLoaded(index: number): boolean;
declare function loadMoreRows(
  startIndex: number,
  stopIndex: number
): Promise<void>;
declare function CellComponent(): ReactElement;

// <begin>

function Example({
  columnCount,
  rowCount
}: {
  columnCount: number;
  rowCount: number;
}) {
  const onRowsRendered = useInfiniteLoader({
    isRowLoaded,
    loadMoreRows,
    rowCount
  });

  return (
    <Grid
      cellComponent={CellComponent}
      cellProps={{}}
      columnCount={columnCount}
      columnWidth={100}
      onCellsRendered={({ rowStartIndex, rowStopIndex }) =>
        onRowsRendered({ startIndex: rowStartIndex, stopIndex: rowStopIndex })
      }
      rowCount={rowCount}
      rowHeight={25}
    />
  );
}

// <end>

export { Example };
