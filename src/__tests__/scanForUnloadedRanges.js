import scanForUnloadedRanges from '../scanForUnloadedRanges';

describe('scanForUnloadedRanges', () => {
  function createIsItemLoaded(rows) {
    return index => rows[index];
  }

  it('should return an empty array for a range of rows that have all been loaded', () => {
    expect(
      scanForUnloadedRanges({
        isItemLoaded: createIsItemLoaded([true, true, true]),
        startIndex: 0,
        stopIndex: 2,
      })
    ).toEqual([]);
  });

  it('return a range of only 1 unloaded row', () => {
    expect(
      scanForUnloadedRanges({
        isItemLoaded: createIsItemLoaded([true, false, true]),
        startIndex: 0,
        stopIndex: 2,
      })
    ).toEqual([[1, 1]]);
  });

  it('return a range of multiple unloaded rows', () => {
    expect(
      scanForUnloadedRanges({
        isItemLoaded: createIsItemLoaded([false, false, true]),
        startIndex: 0,
        stopIndex: 2,
      })
    ).toEqual([[0, 1]]);
  });

  it('return multiple ranges of unloaded rows', () => {
    expect(
      scanForUnloadedRanges({
        isItemLoaded: createIsItemLoaded([
          true,
          false,
          false,
          true,
          false,
          true,
          false,
        ]),
        startIndex: 0,
        stopIndex: 6,
      })
    ).toEqual([[1, 2], [4, 4], [6, 6]]);
  });
});
