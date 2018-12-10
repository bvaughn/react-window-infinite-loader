// @flow

export default function isRangeVisible({
  lastRenderedStartIndex,
  lastRenderedStopIndex,
  startIndex,
  stopIndex,
}: {
  lastRenderedStartIndex: number,
  lastRenderedStopIndex: number,
  startIndex: number,
  stopIndex: number,
}): boolean {
  return !(
    startIndex > lastRenderedStopIndex || stopIndex < lastRenderedStartIndex
  );
}
