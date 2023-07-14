import { omit } from 'lodash-es'
import type { UnwrapNestedRefs } from 'vue'
import type { FetchItemsFn } from './usePaging'
import { usePaging } from './usePaging'

export interface UsePagingScrollOptions<T> {
  threshold?: number
  reverse?: boolean
  immediate?: boolean
  pageSize?: number
  dataSource?: Ref<T[]>
  setDataSource?: (data: T[]) => void
}

export function usePagingScroll<T extends UnionBasis>(target: Ref<HTMLElement | Document | null>, fetchFn: FetchItemsFn<T>, options: UsePagingScrollOptions<T> = { }) {
  const { threshold = 100, reverse, pageSize, immediate, setDataSource } = options
  const dataSource = options.dataSource || ref([]) as Ref<T[]>
  const { loading, load, finished, ...rest } = usePaging({ dataSource, setDataSource, fetchItemsFn: fetchFn }, { reverse, pageSize, immediate })

  const measure = ref<Fn>()
  const currScrollTop = ref(0)

  const loadMore = async (state: UnwrapNestedRefs<ReturnType<typeof useScroll>>) => {
    measure.value = state.measure

    if (finished.value || loading.value)
      return
    await load()
    // 只有向上滚动时才触发
    if (reverse) {
      const scrollContainer = target!.value as HTMLElement
      scrollContainer.scrollTop = currScrollTop.value + scrollContainer.scrollHeight
    }
  }
  // const { x, y, top, right, bottom, left, width, height } = useElementBounding(target as MaybeRef)

  useInfiniteScroll(target, loadMore, {
    direction: reverse ? 'top' : 'bottom',
    interval: threshold,
    onStop: (e) => {
      const scrollContainer = target!.value as HTMLElement
      const { scrollTop, scrollHeight } = scrollContainer
      currScrollTop.value = scrollTop - scrollHeight
    },
  })

  const scrollToBottom = () => {
    if (target!.value) {
      const scrollContainer = target!.value as HTMLElement
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }, 1)
    }
  }

  // 监听需要监听的数据源变化
  watch([dataSource, finished], () => {
    measure.value?.()
  })

  if (immediate) {
    onMounted(() => {
      measure.value?.()
    })
  }
  return { loading, finished, dataSource, scrollToBottom, load, ...omit(rest, 'dataSource') }
}
