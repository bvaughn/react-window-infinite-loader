# react-window-infinite-loader

> InfiniteLoader component inspired by react-virtualized but for use with [react-window](https://github.com/bvaughn/react-window/)

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
| `loadMoreItems` | `(startIndex: number, stopIndex: number) => Promise<void>` | Callback to be invoked when more rows must be loaded. It should return a Promise that is resolved once all data has finished loading. |
| `minimumBatchSize` | `?number` | Minimum number of rows to be loaded at a time; defaults to 10. This property can be used to batch requests to reduce HTTP requests. |
| `threshold` | `?number` | Threshold at which to pre-fetch data; defaults to 15. A threshold of 15 means that data will start loading when a user scrolls within 15 rows. |

## Example usage

The snippet below shows a basic example of how the `InfiniteLoader` can be used to wrap either a `FixedSizeList` or `VariableSizeList` from `react-window`.

```js
// This value is arbitrary.
// If you know the size of your remote data, you can provide a real value.
// You can also increase this value gradually (as shown in the example below).
const itemCount = 1000;

<InfiniteLoader
  isItemLoaded={isItemLoaded}
  itemCount={itemCount}
  loadMoreItems={loadMoreItems}
>
  {({ onItemsRendered, ref }) => (
    <FixedSizeList
      itemCount={itemCount}
      onItemsRendered={onItemsRendered}
      ref={ref}
      {...otherListProps}
    />
  )}
</InfiniteLoader>
```

[Try it on Code Sandbox](https://codesandbox.io/s/5wqo7z2np4)

##  Creating an infinite loading list

The `InfiniteLoader` component was created to help break large data sets down into chunks that could be just-in-time loaded as they were scrolled into view.
It can also be used to create infinite loading lists (e.g. Facebook or Twitter).
Here's a basic example of how you might implement that:

```jsx
function ExampleWrapper({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = items[index].name;
    }

    return <div style={style}>{content}</div>;
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          itemCount={itemCount}
          onItemsRendered={onItemsRendered}
          ref={ref}
          {...props}
        >
          {Item}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}
```

[Try it on Code Sandbox](https://codesandbox.io/s/x70ly749rq)

## License

MIT © [bvaughn](https://github.com/bvaughn)
