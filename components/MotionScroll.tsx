import type { SetupContext, SlotsType, VNodeRef } from 'vue'

interface Props {
  message: string
}
export type ChildSecondRef = VNodeRef & {
  dd: string
}

interface ChildSecondEmits {
  sendMessage(message: string): void
}

interface ChildSecondSlots extends SlotsType {
  default: () => JSX.Element
}

export default defineComponent({
  emits: {
    sendMessage: (value: string) => typeof value === 'string',
  },
  setup: (props: Props, { expose, emit, slots }: SetupContext<ChildSecondEmits, ChildSecondSlots>) => {
    expose({
      dd: 'dd',
    })
    emit('sendMessage', 'ds')
    return () => (
      <div>
        <div>ChildSecond: {props.message}</div>
        <div>{slots.default?.()}</div>
      </div>
    )
  },
})
