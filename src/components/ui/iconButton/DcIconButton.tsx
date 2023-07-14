import { call } from '../utils/call'

export default defineComponent({
  props: {
    iconClass: String,
    onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  },
  setup(props) {
    const onClick = (e: MouseEvent) => {
      if (props.onClick)
        call(props.onClick, e)
    }

    return () => (
      <div class={['icon-btn']} onClick={onClick}>
        <div class={props.iconClass}></div>
      </div>
    )
  },
})
