import { fetchRows } from "./fetchRows";
import { RowComponent } from "./RowComponent";

// <begin>

import { useCallback, useState } from "react";
import { List } from "react-window";
import { useInfiniteLoader } from "react-window-infinite-loader";

const ROW_COUNT = 1_000;

function Example() {
  const [rows, setRows] = useState(() => new Map<number, string>());

  const isRowLoaded = useCallback((index: number) => rows.has(index), [rows]);

  const loadMoreRows = useCallback(
    async (startIndex: number, stopIndex: number) => {
      // fetchRows loads a range of rows (e.g. from a server)
      const loadedRows = await fetchRows(startIndex, stopIndex);

      setRows((prev) => {
        const next = new Map(prev);
        loadedRows.forEach((row, offset) => next.set(startIndex + offset, row));
        return next;
      });
    },
    []
  );

  const onRowsRendered = useInfiniteLoader({
    isRowLoaded,
    loadMoreRows,
    rowCount: ROW_COUNT
  });

  return (
    <List
      onRowsRendered={onRowsRendered}
      rowComponent={RowComponent}
      rowCount={ROW_COUNT}
      rowHeight={25}
      rowProps={{ rows }}
    />
  );
}

// <end>

export { Example };
