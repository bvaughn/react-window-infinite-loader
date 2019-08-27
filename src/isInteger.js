// @flow

export default function isInteger(value: number): boolean {
  return (
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  );
}
