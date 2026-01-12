### 2.0.1
Fix homepage URL in `package.json`

### 2.0.0
Rewrite to be compatible with `react-window` version two API.

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

> **Note** this package now includes and bundles its own TypeScript definitions and so the external `@types/react-window-infinite-loader` package has been deprecated.

### 1.0.10
* Bump `react` and `react-dom` peer dependency to include v19

### 1.0.9
* Update REAMDE

### 1.0.8
* Bump `react` and `react-dom` peer dependency to include v18

### 1.0.7
* Bump `react` and `react-dom` peer dependency to include v17

### 1.0.6
* Memory Usage improvements
* refactor `scanForUnloadedRanges`)`: replaced array of pairs with array of numbers

### 1.0.5
Replaced `Array.prototype.find` with `Array.prototype.some` to enable IE11 compatibility.

### 1.0.4
Replace `Number.isInteger` with custom function that is safe for IE11.

### 1.0.3
Renamed `loadMoreRows` to `loadMoreItems` for consistency (but left a backwards compatible prop with a DEV mode deprecation warning).

### 1.0.2
Added basic API documentation to README.

### 1.0.1
Fixed small unmounting bug.

### 1.0.0
Initial release.