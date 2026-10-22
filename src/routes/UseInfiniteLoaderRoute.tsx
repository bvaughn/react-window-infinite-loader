import { Block, Box, Callout, Code, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/UseInfiniteLoader.json";
import { html as rowComponentHTML } from "../../public/generated/examples/RowComponent.json";
import { ContinueLink } from "../components/ContinueLink";
import { Example } from "./examples/UseInfiniteLoader";

export default function UseInfiniteLoaderRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Hooks" title="useInfiniteLoader" />
      <div>
        The <code>useInfiniteLoader</code> hook returns an{" "}
        <code>onRowsRendered</code> callback to pass to a{" "}
        <code>react-window</code> <code>List</code>. As rows are scrolled into
        view, it calls <code>loadMoreRows</code> for any that have not been
        loaded yet. Scroll the list below to try it out:
      </div>
      <Block className="h-50" data-focus-within="bold">
        <Example />
      </Block>
      <Code html={html} />
      <div>Rows that have not loaded yet can render a placeholder:</div>
      <Code html={rowComponentHTML} />
      <Callout intent="primary">
        Rows are not requested again while a request for them is in progress.
        Once the Promise returned by <code>loadMoreRows</code> settles, rows
        that are still not loaded (e.g. because the request failed) will be
        requested again the next time they are rendered.
      </Callout>
      <ContinueLink
        title="useInfiniteLoader parameters"
        to="/hooks/use-infinite-loader/parameters"
      />
    </Box>
  );
}
