declare function fetchRows(
  startIndex: number,
  stopIndex: number
): Promise<string[]>;
declare function showError(error: unknown): void;
declare function storeRows(startIndex: number, rows: string[]): void;

// <begin>

async function loadMoreRows(startIndex: number, stopIndex: number) {
  try {
    const rows = await fetchRows(startIndex, stopIndex);
    storeRows(startIndex, rows);
  } catch (error) {
    // These rows will be requested again the next time they are rendered
    showError(error);
  }
}

// <end>

export { loadMoreRows };
