import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useInfiniteLoader } from "./useInfiniteLoader";
import type { Props } from "./types";

describe("useInfiniteLoader", () => {
  test("should not load rows that have already been loaded", () => {
    const isRowLoaded = vi.fn(() => true);

    const { result } = renderHook(() =>
      useInfiniteLoader({
        isRowLoaded,
        loadMoreRows: () => {
          throw Error("Unexpected");
        },
        rowCount: 10,
      })
    );

    expect(isRowLoaded).not.toHaveBeenCalled();

    result.current({
      startIndex: 0,
      stopIndex: 9,
    });

    expect(isRowLoaded).toHaveBeenCalledTimes(10);
  });

  test("should call loadMoreRows when needed", () => {
    const loadMoreRows = vi.fn(() => Promise.resolve());

    const { result } = renderHook(() =>
      useInfiniteLoader({
        isRowLoaded: (index) => index <= 2,
        loadMoreRows,
        rowCount: 5,
      })
    );

    expect(loadMoreRows).not.toHaveBeenCalled();

    result.current({
      startIndex: 0,
      stopIndex: 4,
    });

    expect(loadMoreRows).toHaveBeenCalled();
    expect(loadMoreRows).toHaveBeenLastCalledWith(3, 4);
  });

  test("should load every unloaded range", () => {
    const loadMoreRows = vi.fn(() => Promise.resolve());

    const { result } = renderHook(() =>
      useInfiniteLoader({
        isRowLoaded: (index) => index % 4 === 0,
        loadMoreRows,
        minimumBatchSize: 1,
        rowCount: 16,
        threshold: 0,
      })
    );

    result.current({
      startIndex: 0,
      stopIndex: 15,
    });

    expect(loadMoreRows.mock.calls).toEqual([
      [1, 3],
      [5, 7],
      [9, 11],
      [13, 15],
    ]);
  });

  test("should not reload rows that are still pending", () => {
    const loadMoreRows = vi.fn(() => new Promise<void>(() => {}));

    const { result } = renderHook(() =>
      useInfiniteLoader({
        isRowLoaded: () => false,
        loadMoreRows,
        rowCount: 5,
        threshold: 0,
      })
    );

    result.current({
      startIndex: 0,
      stopIndex: 4,
    });
    result.current({
      startIndex: 0,
      stopIndex: 4,
    });

    expect(loadMoreRows).toHaveBeenCalledTimes(1);
  });

  test("should not reload pending rows when callbacks are recreated", () => {
    const loadMoreRows = vi.fn<Props["loadMoreRows"]>(
      () => new Promise<void>(() => {})
    );

    const { result, rerender } = renderHook(() =>
      useInfiniteLoader({
        isRowLoaded: () => false,
        loadMoreRows: (startIndex, stopIndex) =>
          loadMoreRows(startIndex, stopIndex),
        rowCount: 5,
        threshold: 0,
      })
    );

    result.current({
      startIndex: 0,
      stopIndex: 4,
    });

    rerender();

    result.current({
      startIndex: 0,
      stopIndex: 4,
    });

    expect(loadMoreRows).toHaveBeenCalledTimes(1);
  });

  test("should retry rows after a load fails", async () => {
    const loadMoreRows = vi.fn(() => Promise.reject(Error("Expected")));

    const { result } = renderHook(() =>
      useInfiniteLoader({
        isRowLoaded: () => false,
        loadMoreRows,
        rowCount: 5,
        threshold: 0,
      })
    );

    result.current({
      startIndex: 0,
      stopIndex: 4,
    });

    await vi.waitFor(() => {
      result.current({
        startIndex: 0,
        stopIndex: 4,
      });

      expect(loadMoreRows).toHaveBeenCalledTimes(2);
    });
  });

  test("should clear pending rows after a load succeeds", async () => {
    const loadMoreRows = vi.fn(() => Promise.resolve());

    const { result } = renderHook(() =>
      useInfiniteLoader({
        isRowLoaded: () => false,
        loadMoreRows,
        rowCount: 5,
        threshold: 0,
      })
    );

    result.current({
      startIndex: 0,
      stopIndex: 4,
    });

    await vi.waitFor(() => {
      result.current({
        startIndex: 0,
        stopIndex: 4,
      });

      expect(loadMoreRows).toHaveBeenCalledTimes(2);
    });
  });

  test("should memoize callback when props are stable", () => {
    const isRowLoadedFn = () => true;
    const loadMoreRowsFn = () => Promise.resolve();

    const { result, rerender } = renderHook(
      ({
        isRowLoaded = isRowLoadedFn,
        loadMoreRows = loadMoreRowsFn,
        rowCount = 5,
      }: Partial<Props> = {}) =>
        useInfiniteLoader({
          isRowLoaded,
          loadMoreRows,
          rowCount,
        })
    );

    const prev = result.current;

    rerender();

    expect(result.current).toBe(prev);
  });

  test("should recreate memoized callback when props change", () => {
    const isRowLoadedFn = () => true;
    const loadMoreRowsFn = () => Promise.resolve();

    const { result, rerender } = renderHook(
      ({
        isRowLoaded = isRowLoadedFn,
        loadMoreRows = loadMoreRowsFn,
        rowCount = 5,
      }: Partial<Props> = {}) =>
        useInfiniteLoader({
          isRowLoaded,
          loadMoreRows,
          rowCount,
        })
    );

    let prev = result.current;

    rerender({
      isRowLoaded: () => true,
    });
    expect(result.current).not.toBe(prev);

    prev = result.current;

    rerender({
      loadMoreRows: () => Promise.resolve(),
    });
    expect(result.current).not.toBe(prev);

    prev = result.current;

    rerender({
      rowCount: 10,
    });
    expect(result.current).not.toBe(prev);
  });
});
