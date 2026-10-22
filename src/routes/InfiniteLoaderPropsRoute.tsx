import {
  Box,
  Callout,
  ComponentProps,
  type ComponentMetadata
} from "react-lib-tools";
import json from "../../public/generated/docs/InfiniteLoader.json";
import { Link } from "../components/Link";

export default function InfiniteLoaderPropsRoute() {
  return (
    <Box direction="column" gap={4}>
      <ComponentProps json={json as ComponentMetadata} section="Components" />
      <Callout intent="primary">
        The <code>useInfiniteLoader</code> hook accepts the same{" "}
        <Link to="/hooks/use-infinite-loader/parameters">parameters</Link>,
        except for <code>children</code>.
      </Callout>
    </Box>
  );
}
