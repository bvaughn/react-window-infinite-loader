import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { InfiniteLoader } from "./InfiniteLoader";

describe("InfiniteLoader", () => {
  test("should render the children render prop", () => {
    const children = vi.fn(() => <div>Rendered</div>);

    render(
      <InfiniteLoader
        isRowLoaded={() => true}
        loadMoreRows={() => Promise.resolve()}
        rowCount={10}
      >
        {children}
      </InfiniteLoader>
    );

    expect(screen.getByText("Rendered")).toBeTruthy();
    expect(children).toHaveBeenCalledWith({
      onRowsRendered: expect.any(Function),
    });
  });
});
