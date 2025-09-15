import { useCallback, useMemo } from 'react';
import { scanForUnloadedIndices } from './scanForUnloadedIndices';
import type { Indices, OnRowsRendered, Props } from './types';

export function useInfiniteLoader({
  isRowLoaded,
  loadMoreRows,
  minimumBatchSize = 10,
  rowCount,
  threshold = 15,
}: Props) {
  const pendingRowsCache = useMemo(() => {
    void isRowLoaded;
    void loadMoreRows;

    return new Set();
  }, [isRowLoaded, loadMoreRows]);

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

      for (let index = 0; index < unloadedIndices.length; index += 2) {
        const { startIndex: unloadedStartIndex, stopIndex: unloadedStopIndex } =
          unloadedIndices[index];

        for (
          let index = unloadedStartIndex;
          index <= unloadedStopIndex;
          index++
        ) {
          pendingRowsCache.add(index);
        }

        loadMoreRows(unloadedStartIndex, unloadedStopIndex);
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
