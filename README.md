# react-window-infinite-loader

Infinite loader utils inspired by `react-virtualized` but for use with `react-window`.

[Try it out on StackBlitz](https://stackblitz.com/edit/vitejs-vite-qafawqxm?file=src%2FApp.tsx)

If you like this project, [🎉 become a sponsor](https://github.com/sponsors/bvaughn/) or [☕ buy me a coffee](https://buymeacoffee.com/bvaughn).

## Installation

Begin by installing the library from NPM:

```sh
npm install react-window-infinite-loader
```

## Documentation

The recommended way to use this library is the new `useInfiniteLoader` hook:
```tsx
import { useInfiniteLoader } from "react-window-infinite-loader";

function Example() {
  const onRowsLoaded = useInfiniteLoader(props);

  return <List onRowsLoaded={onRowsLoaded} {...rest} />;
}
```

The `InfiniteLoader` component also exists, though it has changed since version 1:
- Child function `onItemsRendered` parameter renamed to `onRowsRendered`
- Child function `listRef` parameter removed

```tsx
import { InfiniteLoader } from "react-window-infinite-loader";

function Example() {
  return (
    <InfiniteLoader {...props}>
      {({ onRowsLoaded }) => <List onRowsLoaded={onRowsLoaded} {...rest} />}
    </InfiniteLoader>
  );
}
```

### Required props
| Name | Type | Description |
| --- | --- | --- |
| `children` | `({ onRowsRendered: Function }) => ReactNode` | Render prop; see below for example usage. |
| `isRowLoaded` | `(index: number) => boolean` | Function responsible for tracking the loaded state of each row. |
| `loadMoreRows` | `(startIndex: number, stopIndex: number) => Promise<void>` | Callback to be invoked when more rows must be loaded. It should return a Promise that is resolved once all data has finished loading. |
| `rowCount` | `number` | Number of rows in list; can be arbitrary high number if actual number is unknown. |

### Optional props
| Name | Type | Description |
| --- | --- | --- |
| `minimumBatchSize` | `number` | Minimum number of rows to be loaded at a time; defaults to 10. This property can be used to batch requests to reduce HTTP requests. |
| `threshold` | `number` | Threshold at which to pre-fetch data; defaults to 15. A threshold of 15 means that data will start loading when a user scrolls within 15 rows. |
