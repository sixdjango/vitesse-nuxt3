import type { SetupContext, SlotsType, VNodeRef } from 'vue'

interface XProps {
  message: string
}
export type XRef = VNodeRef & {
  dd: string
}

interface XEmits {
  example(args: string): void
}

interface XSlots extends SlotsType {
  default(): void
  item(m: string): VNode
}

export default defineComponent({
  emits: {
    example: (value: string) => typeof value === 'string',
  },
  setup: (props: XProps, { expose, emit, slots }: SetupContext<XEmits, XSlots>) => {
    expose({
      dd: 'dd',
    })
    emit('example', 'ds')
    return () => (
      <div>
        <div>X: {props.message}</div>
        <div>{slots.default?.()}</div>
      </div>
    )
  },
})
