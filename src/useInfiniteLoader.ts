import { useCallback, useState } from "react";
import { scanForUnloadedIndices } from "./scanForUnloadedIndices";
import type { Indices, OnRowsRendered, Props } from "./types";

export function useInfiniteLoader({
  isRowLoaded,
  loadMoreRows,
  minimumBatchSize = 10,
  rowCount,
  threshold = 15,
}: Props) {
  // Rows with an in-flight request; entries are removed once that request settles.
  const [pendingRowsCache] = useState(() => new Set<number>());

  const isRowLoadedOrPending = useCallback(
    (index: number) => {
      if (isRowLoaded(index)) {
        return true;
      }

      return pendingRowsCache.has(index);
    },
    [isRowLoaded, pendingRowsCache]
  );

  const onRowsRendered = useCallback<OnRowsRendered>(
    ({ startIndex, stopIndex }: Indices) => {
      const unloadedIndices = scanForUnloadedIndices({
        isRowLoaded: isRowLoadedOrPending,
        minimumBatchSize,
        rowCount,
        startIndex: Math.max(0, startIndex - threshold),
        stopIndex: Math.min(rowCount - 1, stopIndex + threshold),
      });

      for (const {
        startIndex: unloadedStartIndex,
        stopIndex: unloadedStopIndex,
      } of unloadedIndices) {
        for (
          let index = unloadedStartIndex;
          index <= unloadedStopIndex;
          index++
        ) {
          pendingRowsCache.add(index);
        }

        const clearPendingRows = () => {
          for (
            let index = unloadedStartIndex;
            index <= unloadedStopIndex;
            index++
          ) {
            pendingRowsCache.delete(index);
          }
        };

        // Clear on failure too, so the rows can be requested again;
        // handling the error itself is left to the caller's loadMoreRows.
        Promise.resolve(loadMoreRows(unloadedStartIndex, unloadedStopIndex))
          .catch(() => {})
          .finally(clearPendingRows);
      }
    },
    [
      isRowLoadedOrPending,
      loadMoreRows,
      minimumBatchSize,
      pendingRowsCache,
      rowCount,
      threshold,
    ]
  );

  return onRowsRendered;
}
