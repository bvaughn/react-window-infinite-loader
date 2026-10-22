import { Box, Callout, Code, Header, SectionHeader } from "react-lib-tools";
import { html as gridHTML } from "../../public/generated/examples/GridOnCellsRendered.json";
import { ContinueLink } from "../components/ContinueLink";
import { Link } from "../components/Link";

export default function UseInfiniteLoaderParametersRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header
        section="Hooks"
        sourceCodePath="lib/hooks/useInfiniteLoader.ts"
        title="useInfiniteLoader parameters"
      />
      <div>
        The <code>useInfiniteLoader</code> hook accepts a single object with the
        parameters below. Refer to the{" "}
        <Link to="/hooks/use-infinite-loader">useInfiniteLoader</Link> page for
        an example of how to use it.
      </div>
      <SectionHeader>Parameters</SectionHeader>
      <dl className="flex flex-col gap-2">
        <dt className="text-lg font-mono">
          <span className="tok-propertyName">isRowLoaded</span>
          <span className="tok-punctuation">:</span> (index:{" "}
          <span className="tok-typeName">number</span>){" "}
          <span className="tok-punctuation">=&gt;</span> boolean
        </dt>
        <dd className="mb-2">
          Function responsible for tracking the loaded state of each row.
        </dd>
        <dt className="text-lg font-mono">
          <span className="tok-propertyName">loadMoreRows</span>
          <span className="tok-punctuation">:</span> (startIndex:{" "}
          <span className="tok-typeName">number</span>, stopIndex:{" "}
          <span className="tok-typeName">number</span>){" "}
          <span className="tok-punctuation">=&gt;</span>{" "}
          <span className="tok-typeName">Promise</span>
          &lt;void&gt;
        </dt>
        <dd className="mb-2 flex flex-col gap-4">
          <p>
            Callback to be invoked when more rows must be loaded. It should
            return a Promise that is resolved once all data has finished
            loading.
          </p>
          <Callout intent="primary">
            Rows are not requested again while a request for them is in
            progress. Once the Promise settles, rows that are still not loaded
            (e.g. because the request failed) will be requested again the next
            time they are rendered. Errors should be handled within{" "}
            <code>loadMoreRows</code>.
          </Callout>
        </dd>
        <dt className="text-lg font-mono">
          <span className="tok-propertyName">minimumBatchSize</span>
          <span className="tok-punctuation">?:</span>{" "}
          <span className="tok-typeName">number</span>{" "}
          <span className="tok-punctuation">=</span> 10
        </dt>
        <dd className="mb-2">
          Minimum number of rows to be loaded at a time. This can be used to
          batch requests to reduce HTTP requests.
        </dd>
        <dt className="text-lg font-mono">
          <span className="tok-propertyName">rowCount</span>
          <span className="tok-punctuation">:</span>{" "}
          <span className="tok-typeName">number</span>
        </dt>
        <dd className="mb-2">
          Number of rows in the list; can be an arbitrarily high number if the
          actual number is unknown.
        </dd>
        <dt className="text-lg font-mono">
          <span className="tok-propertyName">threshold</span>
          <span className="tok-punctuation">?:</span>{" "}
          <span className="tok-typeName">number</span>{" "}
          <span className="tok-punctuation">=</span> 15
        </dt>
        <dd className="mb-2">
          Threshold at which to pre-fetch data. A threshold of 15 means that
          data will start loading when a user scrolls within 15 rows.
        </dd>
      </dl>
      <SectionHeader>Return value</SectionHeader>
      <dl className="flex flex-col gap-2">
        <dt className="text-lg font-mono">
          <span className="tok-propertyName">onRowsRendered</span>
          <span className="tok-punctuation">:</span> (indices: {"{ "}
          startIndex: <span className="tok-typeName">number</span>; stopIndex:{" "}
          <span className="tok-typeName">number</span>
          {" }"}) <span className="tok-punctuation">=&gt;</span> void
        </dt>
        <dd className="mb-2">
          Callback to pass to the <code>onRowsRendered</code> prop of a{" "}
          <code>List</code>.
        </dd>
      </dl>
      <div>
        A <code>Grid</code> reports the cells it renders with{" "}
        <code>onCellsRendered</code> instead, so pass along its row indices:
      </div>
      <Code html={gridHTML} />
      <ContinueLink
        title="InfiniteLoader component"
        to="/components/infinite-loader"
      />
    </Box>
  );
}
