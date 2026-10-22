// <begin>

import type { RowComponentProps } from "react-window";

function RowComponent({
  index,
  rows,
  style
}: RowComponentProps<{ rows: Map<number, string> }>) {
  return (
    <div className="flex items-center px-2" style={style}>
      {rows.get(index) ?? <span className="text-slate-500">Loading…</span>}
    </div>
  );
}

// <end>

export { RowComponent };
