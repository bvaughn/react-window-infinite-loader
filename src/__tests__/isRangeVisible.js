import isRangeVisible from '../isRangeVisible';

describe('isRangeVisible', () => {
  it('first row(s) are visible', () => {
    expect(
      isRangeVisible({
        lastRenderedStartIndex: 10,
        lastRenderedStopIndex: 20,
        startIndex: 20,
        stopIndex: 30,
      })
    ).toEqual(true);
  });

  it('last row(s) are visible', () => {
    expect(
      isRangeVisible({
        lastRenderedStartIndex: 10,
        lastRenderedStopIndex: 20,
        startIndex: 0,
        stopIndex: 10,
      })
    ).toEqual(true);
  });

  it('all row(s) are visible', () => {
    expect(
      isRangeVisible({
        lastRenderedStartIndex: 10,
        lastRenderedStopIndex: 20,
        startIndex: 12,
        stopIndex: 14,
      })
    ).toEqual(true);
  });

  it('no row(s) are visible', () => {
    expect(
      isRangeVisible({
        lastRenderedStartIndex: 10,
        lastRenderedStopIndex: 20,
        startIndex: 0,
        stopIndex: 9,
      })
    ).toEqual(false);

    expect(
      isRangeVisible({
        lastRenderedStartIndex: 10,
        lastRenderedStopIndex: 20,
        startIndex: 21,
        stopIndex: 30,
      })
    ).toEqual(false);
  });
});
