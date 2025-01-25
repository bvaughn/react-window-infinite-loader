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