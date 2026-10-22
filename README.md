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
  const onRowsRendered = useInfiniteLoader(props);

  return <List onRowsRendered={onRowsRendered} {...rest} />;
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
      {({ onRowsRendered }) => <List onRowsRendered={onRowsRendered} {...rest} />}
    </InfiniteLoader>
  );
}
```

### InfiniteLoader

<!-- InfiniteLoader:description:begin -->
Loads rows as they are scrolled into view; a render prop alternative to the `useInfiniteLoader` hook.
<!-- InfiniteLoader:description:end -->

The `useInfiniteLoader` hook accepts the same props, except for `children`.

#### Required props

<!-- InfiniteLoader:required-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>isRowLoaded</td>
      <td><p>Function responsible for tracking the loaded state of each item.</p>
</td>
    </tr>
    <tr>
      <td>loadMoreRows</td>
      <td><p>Callback to be invoked when more rows must be loaded.
It should return a Promise that is resolved once all data has finished loading.</p>
</td>
    </tr>
    <tr>
      <td>rowCount</td>
      <td><p>Number of rows in list; can be arbitrary high number if actual number is unknown.</p>
</td>
    </tr>
    <tr>
      <td>children</td>
      <td><p>Render prop that receives an <code>onRowsRendered</code> callback to pass to a <code>List</code>.</p>
</td>
    </tr>
  </tbody>
</table>

<!-- InfiniteLoader:required-props:end -->

#### Optional props

<!-- InfiniteLoader:optional-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>minimumBatchSize</td>
      <td><p>Minimum number of rows to be loaded at a time; defaults to 10.
This property can be used to batch requests to reduce HTTP requests.</p>
</td>
    </tr>
    <tr>
      <td>threshold</td>
      <td><p>Threshold at which to pre-fetch data; defaults to 15.
A threshold of 15 means that data will start loading when a user scrolls within 15 rows.</p>
</td>
    </tr>
  </tbody>
</table>

<!-- InfiniteLoader:optional-props:end -->
