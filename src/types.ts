export type Indices = {
  startIndex: number;
  stopIndex: number;
};

export type OnRowsRendered = (indices: Indices) => void;

export type Props = {
  /**
   * Function responsible for tracking the loaded state of each item.
   */
  isRowLoaded: (index: number) => boolean;

  /**
   * Callback to be invoked when more rows must be loaded.
   * It should return a Promise that is resolved once all data has finished loading.
   */
  loadMoreRows: (startIndex: number, stopIndex: number) => Promise<void>;

  /**
   * Minimum number of rows to be loaded at a time; defaults to 10.
   * This property can be used to batch requests to reduce HTTP requests.
   */
  minimumBatchSize?: number;

  /**
   * Threshold at which to pre-fetch data; defaults to 15.
   * A threshold of 15 means that data will start loading when a user scrolls within 15 rows.
   */
  threshold?: number;

  /**
   * Number of rows in list; can be arbitrary high number if actual number is unknown.
   */
  rowCount: number;
};
