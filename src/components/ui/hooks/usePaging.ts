export interface FetchPageResult<T> { items: T[]; total: number; maxIndex?: number; [key: string]: any}

export interface FetchItemsParams { page?: number ; maxIndex?: number; pageSize: number }
export type FetchItemsFn<T> = Fn<[FetchItemsParams], Promise<FetchPageResult<T>>>
export interface UsePagingOptions { page?: number; pageSize?: number; maxIndex?: number; itemsKey?: string; totalKey?: string; immediate?: boolean; reverse?: boolean; [kye: string]: any }

export function usePaging<T extends UnionBasis>(initialData: { fetchItemsFn: FetchItemsFn<T>; dataSource: Ref<T[]>; setDataSource?: (data: T[]) => void }, initialOptions: UsePagingOptions = {}) {
  const options = { pageSize: 10, maxIndex: Date.now() + 100 * 1000, itemsKey: 'items', totalKey: 'total' } as Required<NonNullable<UsePagingOptions>>
  initialOptions = Object.keys(initialOptions).reduce((acc, key) => {
    if (initialOptions[key])
      acc[key] = initialOptions[key]

    return acc
  }, {} as UsePagingOptions)
  Object.assign(options, initialOptions)
  const page = ref<number | undefined>(options.page)
  const pageSize = ref(options.pageSize!)
  const maxIndex = ref(options.maxIndex)
  const total = ref(0)
  const loading = ref(false)
  const finished = ref(false)
  const dataSource = initialData.dataSource || ref([] as T[])
  const setDataSource = initialData.setDataSource || ((data: T[]) => (dataSource.value = data))
  const load = async () => {
    loading.value = true
    try {
      const res = await initialData.fetchItemsFn({ page: page.value, pageSize: pageSize.value, maxIndex: maxIndex.value })
      const remoteItems = res[options.itemsKey!] as T[]
      const remoteTotal = res[options.totalKey!] as number
      let isFinished = false
      if (options.reverse)
        remoteItems.reverse()
      if (page.value) {
        // 分页模式
        isFinished = remoteItems.length < pageSize.value
        setDataSource([...remoteItems])
      }
      else {
        // 滚动模式
        isFinished = remoteItems.length < pageSize.value || !res.maxIndex
        if (options.reverse)
          setDataSource([...remoteItems, ...dataSource.value])
        else
          setDataSource([...dataSource.value, ...remoteItems])
      }

      maxIndex.value = res.maxIndex || 0
      finished.value = isFinished
      total.value = remoteTotal
    }
    catch (e) {
      console.error(e)
    }
    finally {
      loading.value = false
    }
  }

  const reload = () => {
    page.value = undefined
    maxIndex.value = Date.now() + 100 * 1000
    loading.value = false
    finished.value = false
    setDataSource([])
  }

  watch([page, pageSize], () => {
    load()
  })

  // 初始化时立即获取数据
  if (options.immediate) {
    onMounted(() => {
      load()
    })
  }

  return { page, pageSize, dataSource, maxIndex, total, loading, finished, load, reload, setDataSource }
}
