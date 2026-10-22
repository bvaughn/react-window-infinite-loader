import { Block, Box, Code, ExternalLink, Header } from "react-lib-tools";
import { html } from "../../public/generated/examples/InfiniteLoader.json";
import { ContinueLink } from "../components/ContinueLink";
import { Link } from "../components/Link";
import { Example } from "./examples/InfiniteLoader";

export default function InfiniteLoaderRoute() {
  return (
    <Box direction="column" gap={4}>
      <Header section="Components" title="InfiniteLoader" />
      <div>
        The <code>InfiniteLoader</code> component accepts the same props as the{" "}
        <Link to="/hooks/use-infinite-loader">
          <code>useInfiniteLoader</code> hook
        </Link>{" "}
        and passes the <code>onRowsRendered</code> callback to a{" "}
        <ExternalLink href="https://legacy.reactjs.org/docs/render-props.html">
          render prop
        </ExternalLink>
        .
      </div>
      <Block className="h-50" data-focus-within="bold">
        <Example />
      </Block>
      <Code html={html} />
      <ContinueLink
        title="InfiniteLoader props"
        to="/components/infinite-loader/props"
      />
    </Box>
  );
}
