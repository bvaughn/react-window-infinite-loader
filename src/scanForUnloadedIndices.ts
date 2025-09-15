import type { Indices } from "./types";

export function scanForUnloadedIndices({
  isRowLoaded,
  minimumBatchSize,
  rowCount,
  startIndex,
  stopIndex,
}: {
  isRowLoaded: (index: number) => boolean;
  minimumBatchSize: number;
  rowCount: number;
  startIndex: number;
  stopIndex: number;
}): Indices[] {
  const indices: Indices[] = [];

  let currentStartIndex = -1;
  let currentStopIndex = -1;

  for (let index = startIndex; index <= stopIndex; index++) {
    if (!isRowLoaded(index)) {
      currentStopIndex = index;
      if (currentStartIndex < 0) {
        currentStartIndex = index;
      }
    } else if (currentStopIndex >= 0) {
      indices.push({
        startIndex: currentStartIndex,
        stopIndex: currentStopIndex,
      });

      currentStartIndex = currentStopIndex = -1;
    }
  }

  // Scan forward to satisfy the minimum batch size.
  if (currentStopIndex >= 0) {
    const potentialStopIndex = Math.min(
      Math.max(currentStopIndex, currentStartIndex + minimumBatchSize - 1),
      rowCount - 1
    );

    for (
      let index = currentStopIndex + 1;
      index <= potentialStopIndex;
      index++
    ) {
      if (!isRowLoaded(index)) {
        currentStopIndex = index;
      } else {
        break;
      }
    }

    indices.push({
      startIndex: currentStartIndex,
      stopIndex: currentStopIndex,
    });
  }

  // Check to see if our first range ended prematurely.
  // In this case we should scan backwards to satisfy the minimum batch size.
  if (indices.length) {
    const firstIndices = indices[0];
    while (
      firstIndices.stopIndex - firstIndices.startIndex + 1 < minimumBatchSize &&
      firstIndices.startIndex > 0
    ) {
      const index = firstIndices.startIndex - 1;
      if (!isRowLoaded(index)) {
        firstIndices.startIndex = index;
      } else {
        break;
      }
    }
  }

  return indices;
}
