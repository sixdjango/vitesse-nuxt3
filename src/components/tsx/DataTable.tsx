import type { DataTableInst, DataTableProps } from 'naive-ui'
import { NDataTable } from 'naive-ui'

/**
 * 解决 ExtractPublicPropTypes 中的 key of 报错 所以使用 defineComponent
 */
export default defineComponent({
  setup(props: DataTableProps) {
    const tableRef = ref<DataTableInst>()

    return () => (
      <NDataTable ref={tableRef} {...props} />
    )
  },
})
