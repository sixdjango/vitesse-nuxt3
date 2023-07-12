import type { DataTableColumns } from 'naive-ui'

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

export const columns: DataTableColumns<RowData> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: 'Name',
    key: 'name',
    width: 200,
    fixed: 'left',
  },
  {
    title: 'Age',
    key: 'age',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Row',
    key: 'row',
    render(row, index) {
      return <div>dd</div>
    },
  },
  {
    title: 'Row1',
    key: 'row1',
    render(row, index) {
      return h('span', ['row ', index])
    },
  },
  {
    title: 'Row2',
    key: 'row2',
    render(row, index) {
      return h('span', ['row ', index])
    },
    width: 100,
    fixed: 'right',
  },
  {
    title: 'Address',
    key: 'address',
    width: 200,
    fixed: 'right',
  },
]
