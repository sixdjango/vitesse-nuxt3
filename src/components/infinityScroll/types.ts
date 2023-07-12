import type { FetchItemsFn } from 'composables/usePaging'
import type { UsePagingScrollOptions } from '~/composables/usePagingScroll'

export type InfinityScrollProps<T> = {
  items: T[]
  fetchItemsFn: FetchItemsFn<T>
} & Omit< UsePagingScrollOptions<T>, 'dataSource'>

export interface InfinityScrollSlots<T> {
  item: (item: T, index: number) => VNode
}

export interface InfinityScrollEvents<T> {
  (event: 'loadMore', state: { pageSize: number; page?: number; maxIndex?: number }): Promise<T>
  (event: 'update:items', items: T[]): void
}
