import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useInfiniteLoader } from './useInfiniteLoader';
import type { Props } from './types';

describe('useInfiniteLoader', () => {
  test('should not load rows that have already been loaded', () => {
    const isRowLoaded = vi.fn(() => true);

    const { result } = renderHook(() =>
      useInfiniteLoader({
        isRowLoaded,
        loadMoreRows: () => {
          throw Error('Unexpected');
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

  test('should call loadMoreRows when needed', () => {
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

  test('should memoize callback when props are stable', () => {
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

  test('should recreate memoized callback when props change', () => {
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
