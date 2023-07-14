import type { SlotsType } from 'vue'

export interface DcPopupProps {

}

export default defineComponent({
  slots: Object as SlotsType<{
    default: void
    // 内部节点
    internal: void
  }>,
  setup(props: DcPopupProps, { slots, emit }) {
    slots.default?.()
  },
})
