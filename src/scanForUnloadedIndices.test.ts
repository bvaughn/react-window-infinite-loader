import { describe, expect, test, vi } from 'vitest';
import { scanForUnloadedIndices } from './scanForUnloadedIndices';

describe('scanForUnloadedIndices', () => {
  test('should return an empty array for a range of rows that have all been loaded', () => {
    const isRowLoaded = vi.fn((index: number) => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThanOrEqual(2);
      return true;
    });

    expect(
      scanForUnloadedIndices({
        minimumBatchSize: 0,
        isRowLoaded,
        rowCount: 3,
        startIndex: 0,
        stopIndex: 2,
      })
    ).toEqual([]);

    expect(isRowLoaded).toHaveBeenCalledTimes(3);
  });

  test('return a range of only 1 unloaded row', () => {
    const isRowLoaded = vi.fn((index: number) => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThanOrEqual(2);
      return index !== 1;
    });

    expect(
      scanForUnloadedIndices({
        minimumBatchSize: 0,
        isRowLoaded,
        rowCount: 3,
        startIndex: 0,
        stopIndex: 2,
      })
    ).toEqual([{ startIndex: 1, stopIndex: 1 }]);

    expect(isRowLoaded).toHaveBeenCalledTimes(3);
  });

  test('return a range of multiple unloaded rows', () => {
    const isRowLoaded = vi.fn((index: number) => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThanOrEqual(2);
      return index === 2;
    });

    expect(
      scanForUnloadedIndices({
        minimumBatchSize: 0,
        isRowLoaded,
        rowCount: 3,
        startIndex: 0,
        stopIndex: 2,
      })
    ).toEqual([{ startIndex: 0, stopIndex: 1 }]);

    expect(isRowLoaded).toHaveBeenCalledTimes(3);
  });

  test('return multiple ranges of unloaded rows', () => {
    const isRowLoaded = vi.fn((index: number) => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThanOrEqual(6);
      switch (index) {
        case 0:
        case 3:
        case 5: {
          return true;
        }
      }

      return false;
    });

    expect(
      scanForUnloadedIndices({
        minimumBatchSize: 0,
        isRowLoaded,
        rowCount: 7,
        startIndex: 0,
        stopIndex: 6,
      })
    ).toEqual([
      { startIndex: 1, stopIndex: 2 },
      { startIndex: 4, stopIndex: 4 },
      { startIndex: 6, stopIndex: 6 },
    ]);

    expect(isRowLoaded).toHaveBeenCalledTimes(7);
  });

  test('return respect the minimum batch size param when fetching rows ahead', () => {
    const isRowLoaded = vi.fn((index: number) => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThanOrEqual(9);
      return index < 4;
    });

    expect(
      scanForUnloadedIndices({
        minimumBatchSize: 4,
        isRowLoaded,
        rowCount: 10,
        startIndex: 0,
        stopIndex: 4,
      })
    ).toEqual([{ startIndex: 4, stopIndex: 7 }]);

    expect(isRowLoaded).toHaveBeenCalledTimes(8);
  });

  test('return respect the minimum batch size param when fetching rows behind', () => {
    const isRowLoaded = vi.fn((index: number) => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThanOrEqual(9);
      return index > 6;
    });

    expect(
      scanForUnloadedIndices({
        minimumBatchSize: 4,
        isRowLoaded,
        rowCount: 10,
        startIndex: 6,
        stopIndex: 9,
      })
    ).toEqual([{ startIndex: 3, stopIndex: 6 }]);

    expect(isRowLoaded).toHaveBeenCalledTimes(7);
  });
});
