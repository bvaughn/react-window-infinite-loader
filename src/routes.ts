import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export type Route = LazyExoticComponent<ComponentType<unknown>>;

export const routes = {
  "/hooks/use-infinite-loader": lazy(
    () => import("./routes/UseInfiniteLoaderRoute")
  ),
  "/hooks/use-infinite-loader/parameters": lazy(
    () => import("./routes/UseInfiniteLoaderParametersRoute")
  ),
  "/components/infinite-loader": lazy(
    () => import("./routes/InfiniteLoaderRoute")
  ),
  "/components/infinite-loader/props": lazy(
    () => import("./routes/InfiniteLoaderPropsRoute")
  )
} satisfies Record<string, Route>;

export type Routes = Record<keyof typeof routes, Route>;
export type Path = keyof Routes;
