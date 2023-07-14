import DcIconButton from '../iconButton/DcIconButton'
import DcMask, { dcMaskEmits, dcMaskProps } from '../mask/DcMask'
import DcMotion from '../motion/DcMotion'

export const dcDialogProps = {
  ...dcMaskProps,
  show: {
    type: Boolean,
    default: false,
  },
  closeBtn: {
    type: Boolean,
    default: true,
  },
  // 内容区域的样式
  contentClass: String,

}

export default defineComponent({
  name: 'DcDialog',
  props: dcDialogProps,
  emits: dcMaskEmits,
  setup(props, { slots, emit }) {
    const onCloseClick = () => {
      emit('update:show', false)
    }
    return () => (
      <DcMask
        {...props}
        class={['flex items-center justify-center']}
        onUpdate:show={e => emit('update:show', e)}
        onBeforeShow={() => emit('beforeShow')}
        >

          {{
            // 内容区域
            default: ({ animationShow }: { animationShow: boolean }) => (
              <DcMotion show={animationShow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                class={['z-1 p-5 bg-white rounded-2 relative min-w-xs', { 'pt-6': props.closeBtn }, props.contentClass]}
                >
                {props.closeBtn && <DcIconButton iconClass='i-carbon:close' class={['text-xl', 'absolute', 'right-1.5', 'top-1.5']} onClick={onCloseClick}/>}
                {slots.default?.()}
              </DcMotion>
            ),
          }}
      </DcMask>
    )
  },
})
