import type { SetupContext, SlotsType, VNodeRef } from 'vue'

interface Props<T> {
  message: string
  items: T[]
}
export type ChildSecondRef = VNodeRef & {
  dd: string
}

interface XEmits {
  sendMessage(message: string): void
}

export default defineComponent(

  <T extends object>(props: Props<T>, { expose, emit, slots }: SetupContext<XEmits, SlotsType<{
    default: { foo: string; bar: number }
    item: { data: T }
  }>>) => {
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
  {
    emits: {
      sendMessage: (value: string) => typeof value === 'string',
    },

    slots: Object as SlotsType<{
      default: { foo: string; bar: number }
      item: { data: object }
    }>,
  })
