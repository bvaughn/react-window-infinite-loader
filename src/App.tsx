import {
  AppRoot,
  Callout,
  Code,
  ExternalLink,
  type CommonQuestion,
  type DefaultPath,
  type NavConfig
} from "react-lib-tools";
import { repository } from "../package.json";
import Logo from "../public/favicon.svg?react";
import { html as errorHandlingHTML } from "../public/generated/examples/ErrorHandling.json";
import { html as unknownRowCountHTML } from "../public/generated/examples/UnknownRowCount.json";
import { Link } from "./components/Link";
import { routes, type Path } from "./routes";

export default function App() {
  return (
    <AppRoot
      commonQuestions={commonQuestions}
      enableSiteSearch
      nav={nav}
      overview={
        <>
          <div>
            This package loads data for{" "}
            <ExternalLink href="https://react-window.vercel.app/">
              react-window
            </ExternalLink>{" "}
            lists and grids as the user scrolls. It can be used as a{" "}
            <Link to="/hooks/use-infinite-loader">hook</Link> or as a{" "}
            <Link to="/components/infinite-loader">component</Link>.
          </div>
          <Callout intent="primary">
            Version 2 of this package is for use with version 2 of{" "}
            <code>react-window</code>. Documentation for version 1 can be found{" "}
            <ExternalLink href="https://github.com/bvaughn/react-window-infinite-loader/tree/1.0.10">
              here
            </ExternalLink>
            .
          </Callout>
        </>
      }
      packageDescription="load data as you scroll"
      packageLogo={<Logo className="rwil-logo w-8 h-8" />}
      packageName="react-window-infinite-loader"
      repositoryUrl={repository.url}
      routes={routes}
    />
  );
}

const nav: NavConfig<Path | DefaultPath> = [
  { path: "/", title: "Getting started" },
  {
    title: "Hooks",
    links: [
      { path: "/hooks/use-infinite-loader", title: "useInfiniteLoader" },
      {
        path: "/hooks/use-infinite-loader/parameters",
        title: "useInfiniteLoader parameters"
      }
    ]
  },
  {
    title: "Components",
    links: [
      { path: "/components/infinite-loader", title: "InfiniteLoader" },
      {
        path: "/components/infinite-loader/props",
        title: "InfiniteLoader props"
      }
    ]
  },
  { path: "/common-questions", title: "Common questions" },
  { path: "/support", title: "Support" }
];

const commonQuestions: CommonQuestion[] = [
  {
    id: "unknown-row-count",
    question: "What if I don't know how many rows there are?",
    answer: (
      <>
        <p>
          If your data is paginated, you can render one more row than you have
          loaded for as long as there are more pages to load. When that row is
          scrolled into view, it will trigger loading the next page.
        </p>
        <Code html={unknownRowCountHTML} />
        <p>
          Alternately, <code>rowCount</code> can be set to an arbitrarily high
          number.
        </p>
      </>
    )
  },
  {
    id: "error-handling",
    question: "What happens if loading rows fails?",
    answer: (
      <>
        <p>
          Rows are considered pending until the Promise returned by{" "}
          <code>loadMoreRows</code> settles. After that, rows that are still not
          loaded will be requested again the next time they are rendered.
        </p>
        <p>
          Errors should be handled within <code>loadMoreRows</code>, for
          example:
        </p>
        <Code html={errorHandlingHTML} />
      </>
    )
  }
];
