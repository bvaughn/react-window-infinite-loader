// Simulates loading a range of rows from a server
export function fetchRows(
  startIndex: number,
  stopIndex: number
): Promise<string[]> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          Array.from(
            { length: stopIndex - startIndex + 1 },
            (_, index) => `Row ${startIndex + index + 1}`
          )
        ),
      1000
    )
  );
}
