import type { SlotsType, VNodeRef } from 'vue'

interface Props {
  message: string
}
export type ChildSecondRef = VNodeRef & {
  dd: string
}

export default defineComponent({
  emits: {
    sendMessage: (value: string) => typeof value === 'string',
  },

  slots: Object as SlotsType<{
    default: { foo: string; bar: number }
    item: { data: number }
  }>,

  setup(props: Props, { expose, emit, slots }) {
    expose({
      dd: 'dd',
    })
    emit('sendMessage', 'ds')
    return () => (
      <div>
        <div>ChildSecond: {props.message}</div>
        <div>{slots.default?.({ foo: '', bar: 1 })}</div>
      </div>
    )
  },
})
