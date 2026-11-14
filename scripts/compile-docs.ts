import { compileDocs } from "react-lib-tools/scripts/compile-docs.ts";

await compileDocs({
  componentNames: ["InfiniteLoader"],
  hookNames: ["useInfiniteLoader"],
  imperativeHandleNames: []
});
