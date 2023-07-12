import { usePagingScroll } from '~/composables/usePagingScroll'

export default defineComponent({
  setup() {
    const scrollRef = ref<HTMLElement | Document | null>(null)
    const { dataSource } = usePagingScroll<number>(
      scrollRef,
      async ({ pageSize, page, maxIndex }) => {
        await sleep(1000)
        consola.info('load')
        return { items: [1, 2, 3, 4, 5], total: 5, maxIndex: 1232 }
      }, {
        immediate: true,
        pageSize: 5,
        // reverse: true,
      })
    return () => (
      <div ref={scrollRef} class="h-50vh w-50vh overflow-auto">
        {dataSource.value.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    )
  },
})
