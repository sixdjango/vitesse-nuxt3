import { columns } from './logic/column'
import { ClientOnly } from '#components'
import DataTableVue from '~/components/DataTable'

export default defineComponent({
  setup(props) {
    const data = Array.from({ length: 5000 }).map((_, index) => ({
      key: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
    }))

    return () => (
      <div>
        <ClientOnly>
          <DataTableVue data={data} columns={columns} maxHeight={250} scrollX={1800} virtualScroll/>
        </ClientOnly>
      </div>
    )
  },
})
