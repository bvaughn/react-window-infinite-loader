import * as React from 'react';
import { ListOnItemsRenderedProps } from 'react-window';

export interface ChildrenParams {
  onItemsRendered: (props: ListOnItemsRenderedProps) => any;
  ref: React.Ref<any>;
}

export interface InfiniteLoaderProps {
  children: (params: ChildrenParams) => React.ReactNode;
  isItemLoaded: (index: number) => boolean;
  itemCount: number;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
  minimumBatchSize?: number;
  threshold?: number;
}

export default class InfiniteLoader extends React.Component<InfiniteLoaderProps> {}
