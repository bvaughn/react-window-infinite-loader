# react-window-infinite-loader

> InfiniteLoader component inspired by react-virtualized but for use with [react-window](https://github.com/bvaughn/react-window/)

[Demo](https://codesandbox.io/s/5wqo7z2np4)

## Install

```bash
# Yarn
yarn add react-window-infinite-loader

# NPM
npm install --save react-window-infinite-loader
```

## Documentation

| Name | Type | Description |
| --- | --- | --- |
| `children` | `({ onItemsRendered: Function, ref: React$Ref }) => React$Node` | Render prop. See below for example usage. | 
| `isItemLoaded` | `(index: number) => boolean` | Function responsible for tracking the loaded state of each item. |
| `itemCount` | `number` | Number of rows in list; can be arbitrary high number if actual number is unknown. |
| `loadMoreRows` | `(startIndex: number, stopIndex: number) => Promise<void>` | Callback to be invoked when more rows must be loaded. It should return a Promise that is resolved once all data has finished loading. |
| `minimumBatchSize` | `?number` | Minimum number of rows to be loaded at a time; defaults to 10. This property can be used to batch requests to reduce HTTP requests. |
| `threshold` | `?number` | Threshold at which to pre-fetch data; defaults to 15. A threshold of 15 means that data will start loading when a user scrolls within 15 rows. |

## Example usage

```js
<InfiniteLoader
  isItemLoaded={isItemLoaded}
  itemCount={1000}
  loadMoreRows={loadMoreRows}
>
  {({ onItemsRendered, ref }) => (
    <FixedSizeList
      onItemsRendered={onItemsRendered}
      ref={ref}
      {...otherListProps}
    />
  )}
</InfiniteLoader>
```

## License

MIT © [bvaughn](https://github.com/bvaughn)
