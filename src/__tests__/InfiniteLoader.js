import React, { createRef } from 'react';
import { render } from 'react-dom';
import { FixedSizeList, VariableSizeList } from 'react-window';
import InfiniteLoader from '../InfiniteLoader';

describe('InfiniteLoader', () => {
  let autoResolve;
  let container;
  let isItemLoaded;
  let isItemLoadedMap = {};
  let loadMoreRows;
  let loadMoreRowsPromises;
  let innerOnRowsRendered;
  let Row;

  beforeEach(() => {
    container = document.createElement('div');

    isItemLoadedMap = {};
    isItemLoaded = jest.fn(index => !!isItemLoadedMap[index]);

    autoResolve = true;
    loadMoreRowsPromises = [];
    loadMoreRows = jest.fn((startIndex, stopIndex) => {
      for (let index = startIndex; index <= stopIndex; index++) {
        isItemLoadedMap[index] = true;
      }
      if (autoResolve) {
        return Promise.resolve();
      } else {
        return new Promise(resolve => {
          loadMoreRowsPromises.push(resolve);
        });
      }
    });

    Row = jest.fn(({ index, style }) => <div style={style}>{index}</div>);
  });

  function getMarkup({
    height = 100,
    itemCount = 100,
    itemSize = 20,
    minimumBatchSize = 1,
    ref,
    threshold = 10,
    width = 200,
    ...rest
  } = {}) {
    return (
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreRows={loadMoreRows}
        minimumBatchSize={minimumBatchSize}
        threshold={threshold}
        {...rest}
      >
        {({ onItemsRendered, ref: innerRef }) => {
          innerOnRowsRendered = onItemsRendered;

          return (
            <FixedSizeList
              height={height}
              itemCount={itemCount}
              itemSize={itemSize}
              onItemsRendered={onItemsRendered}
              overscanCount={1}
              ref={list => {
                if (ref) {
                  ref.current = list;
                }
                innerRef(list);
              }}
              width={width}
            >
              {Row}
            </FixedSizeList>
          );
        }}
      </InfiniteLoader>
    );
  }

  describe('dev validation warnings', () => {
    it('should warn if ref is not attached', () => {
      spyOn(console, 'warn');
      render(
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={100}
          loadMoreRows={loadMoreRows}
        >
          {({ onItemsRendered, ref }) => null}
        </InfiniteLoader>,
        container
      );
      expect(console.warn).lastCalledWith(
        'Invalid list ref; please refer to InfiniteLoader documentation.'
      );
    });

    it('should warn if onItemsRendered params look incorrect', () => {
      render(getMarkup(), container);
      spyOn(console, 'warn');
      innerOnRowsRendered({});
      expect(console.warn).lastCalledWith(
        'Invalid onItemsRendered signature; please refer to InfiniteLoader documentation.'
      );
    });
  });

  describe('isItemLoaded', () => {
    it('should check loaded status for all rows within the threshold of the rendered range', () => {
      render(getMarkup(), container);
      expect(isItemLoaded.mock.calls.map(args => args[0])).toEqual([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
      ]);
    });

    it('should not exceed itemCount', () => {
      render(getMarkup({ itemCount: 10 }), container);
      expect(isItemLoaded.mock.calls.map(args => args[0])).toEqual([
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ]);
    });

    it('should not exceed itemCount', () => {
      render(getMarkup({ itemCount: 3 }), container);
      expect(isItemLoaded.mock.calls.map(args => args[0])).toEqual([0, 1, 2]);
    });
  });

  describe('loadMoreRows', () => {
    it('should call :loadMoreRows for unloaded rows within the itemCount', () => {
      render(getMarkup({ itemCount: 10 }), container);
      expect(loadMoreRows).toHaveBeenCalledTimes(1);
      expect(loadMoreRows).lastCalledWith(0, 9);
    });

    it('should trigger an update after the returned Promise resolves', async done => {
      render(getMarkup(), container);
      Row.mockClear();
      await Promise.resolve();
      expect(loadMoreRows).toHaveBeenCalledTimes(1);
      expect(Row).toHaveBeenCalled();
      done();
    });

    it('should trigger an update for VariableSizeList after the returned Promise resolves', async done => {
      const itemSize = jest.fn(() => 20);
      render(
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={100}
          loadMoreRows={loadMoreRows}
        >
          {({ onItemsRendered, ref }) => {
            return (
              <VariableSizeList
                height={100}
                itemCount={100}
                itemSize={itemSize}
                onItemsRendered={onItemsRendered}
                overscanCount={1}
                ref={ref}
                width={200}
              >
                {Row}
              </VariableSizeList>
            );
          }}
        </InfiniteLoader>,
        container
      );
      Row.mockClear();
      itemSize.mockClear();
      await Promise.resolve();
      expect(loadMoreRows).toHaveBeenCalledTimes(1);
      expect(itemSize).toHaveBeenCalled();
      expect(Row).toHaveBeenCalled();
      done();
    });

    it('should not :forceUpdate once rows have loaded rows are no longer visible', async done => {
      autoResolve = false;

      render(getMarkup(), container);
      expect(Row).toHaveBeenCalled();

      // Simulate a new range of rows being loaded
      innerOnRowsRendered({ visibleStartIndex: 50, visibleStopIndex: 55 });
      expect(loadMoreRowsPromises).toHaveLength(2);
      Row.mockClear();

      // Resolving the first promise should not re-render,
      // since that range of rows is no longer visible.
      loadMoreRowsPromises[0]();
      await Promise.resolve();
      expect(Row).not.toHaveBeenCalled();

      // Resolving th second promise should cause a re-render though.
      loadMoreRowsPromises[1]();
      await Promise.resolve();
      expect(Row).toHaveBeenCalled();

      done();
    });

    it('should memoize to avoid calling unless ranges change', () => {
      render(
        getMarkup({
          isItemLoaded: () => false,
          minimumBatchSize: 20,
          threshold: 0,
        }),
        container
      );
      expect(loadMoreRows).toHaveBeenCalledTimes(1);

      innerOnRowsRendered({ visibleStartIndex: 0, visibleStopIndex: 15 });
      expect(loadMoreRows).toHaveBeenCalledTimes(1);

      innerOnRowsRendered({ visibleStartIndex: 0, visibleStopIndex: 20 });
      expect(loadMoreRows).toHaveBeenCalledTimes(2);
    });
  });

  describe('resetLoadMoreRowsCache', () => {
    it('should reset memoized state', () => {
      const component = render(
        getMarkup({
          isItemLoaded: () => false,
          minimumBatchSize: 20,
          threshold: 0,
        }),
        container
      );
      innerOnRowsRendered({ visibleStartIndex: 0, visibleStopIndex: 15 });
      expect(loadMoreRows).toHaveBeenCalledTimes(1);
      expect(loadMoreRows).lastCalledWith(0, 19);

      loadMoreRows.mockClear();
      component.resetLoadMoreRowsCache();
      innerOnRowsRendered({ visibleStartIndex: 0, visibleStopIndex: 15 });
      expect(loadMoreRows).lastCalledWith(0, 19);
    });

    it('should call loadMoreRows if autoReload parameter is true', () => {
      const component = render(
        getMarkup({
          isItemLoaded: () => false,
          minimumBatchSize: 1,
          threshold: 0,
        }),
        container
      );

      // Simulate a new range of rows being loaded
      innerOnRowsRendered({ visibleStartIndex: 20, visibleStopIndex: 30 });
      expect(loadMoreRows).lastCalledWith(20, 30);

      loadMoreRows.mockClear();
      component.resetLoadMoreRowsCache(true);
      expect(loadMoreRows).lastCalledWith(20, 30);
    });
  });

  describe('minimumBatchSize', () => {
    it('should be respected when scrolling down', () => {
      render(
        getMarkup({
          minimumBatchSize: 10,
          threshold: 0,
        }),
        container
      );
      expect(loadMoreRows).toHaveBeenCalledTimes(1);
      expect(loadMoreRows).lastCalledWith(0, 9);
    });

    it('should be respected when scrolling up', () => {
      const ref = createRef();
      render(
        getMarkup({
          isItemLoaded: index => index >= 20,
          minimumBatchSize: 10,
          ref,
          threshold: 0,
        }),
        container
      );
      loadMoreRows.mockClear();
      ref.current.scrollToItem(15);
      expect(loadMoreRows).toHaveBeenCalledTimes(1);
      expect(loadMoreRows).lastCalledWith(10, 19);
    });

    it('should not interfere with the threshold', () => {
      render(
        getMarkup({
          minimumBatchSize: 10,
          threshold: 10,
        }),
        container
      );
      expect(loadMoreRows).toHaveBeenCalledTimes(1);
      expect(loadMoreRows).lastCalledWith(0, 15);
    });

    it('should be respected minimumBatchSize if a user scrolls past the previous range', () => {
      const isItemLoadedIndices = {};

      function isItemLoaded(index) {
        if (!isItemLoadedIndices[index]) {
          isItemLoadedIndices[index] = true;
          return false;
        } else {
          return true;
        }
      }

      render(
        getMarkup({
          isItemLoaded,
          minimumBatchSize: 10,
          threshold: 0,
        }),
        container
      );

      // Simulate a new range of rows being loaded
      innerOnRowsRendered({ visibleStartIndex: 5, visibleStopIndex: 10 });
      expect(loadMoreRows).toHaveBeenCalledTimes(2);
      expect(loadMoreRows.mock.calls[0]).toEqual([0, 9]);
      expect(loadMoreRows.mock.calls[1]).toEqual([10, 19]);
    });

    it('should not exceed item count if larger than needed', () => {
      render(
        getMarkup({
          minimumBatchSize: 10,
          itemCount: 25,
          threshold: 0,
        }),
        container
      );
      // Simulate a new range of rows being loaded
      innerOnRowsRendered({ visibleStartIndex: 18, visibleStopIndex: 22 });
      expect(loadMoreRows).toHaveBeenCalledTimes(2);
      expect(loadMoreRows.mock.calls[0]).toEqual([0, 9]);
      expect(loadMoreRows.mock.calls[1]).toEqual([15, 24]);
    });

    it('should not go negative if larger than needed', () => {
      const ref = createRef();
      render(
        getMarkup({
          isItemLoaded: index => index >= 6,
          minimumBatchSize: 10,
          ref,
          threshold: 0,
        }),
        container
      );

      ref.current.scrollToItem(15);
      loadMoreRows.mockClear();
      ref.current.scrollToItem(2);

      expect(loadMoreRows).toHaveBeenCalledTimes(1);
      expect(loadMoreRows).lastCalledWith(0, 5);
    });
  });
});
