import type { SlotsType } from 'vue'
import DcMotion from '../motion/DcMotion'
import { ProvideKey } from '../constants/provide'

export const dcMaskProps = {
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
  clickable: {
    type: Boolean,
    default: true,
  },
  beforeShowFn: Function as PropType<Fn<UnionBasis[], MaybePromise<UnionBasis>>>,
  beforeHideFn: Function as PropType<Fn<UnionBasis[], MaybePromise<UnionBasis>>>,
  afterShowFn: Function as PropType<Fn<UnionBasis[], MaybePromise<UnionBasis>>>,
  afterHideFn: Function as PropType<Fn<UnionBasis[], MaybePromise<UnionBasis>>>,
}

export const dcMaskEmits = {
  'beforeShow': () => true as MaybePromise<boolean>,
  'afterShow': () => true,
  'beforeHide': () => true,
  'afterHide': () => true,
  'update:show': (show: boolean) => typeof show === 'boolean',
}

export default defineComponent({
  props: dcMaskProps,
  emits: dcMaskEmits,
  slots: Object as SlotsType<{
    default: { animationShow: boolean; internalShow: boolean }
    // 内部节点
    internal: void
  }>,
  setup(props, { slots, emit }) {
    // 控制动画的显示
    const animationShow = ref(false)
    // 控制整个组件的显示
    const internalShow = ref(false)

    provide(ProvideKey.MaskProvider, {
      animationShow,
      internalShow,
    })

    const onShowChange = async (show: boolean) => {
      if (show) {
        emit('beforeShow')
        // 执行显示之前的钩子函数
        props.beforeShowFn && await props.beforeShowFn()
        internalShow.value = props.show
        animationShow.value = props.show
      }
      else {
        emit('beforeHide')
        props.beforeHideFn && await props.beforeHideFn()
        animationShow.value = props.show
      }
    }

    // 退出动画结束后，隐藏整个组件
    const onExitComplete = () => {
      emit('afterHide')
      props.afterHideFn && props.afterHideFn()
      internalShow.value = false
    }

    watch(() => props.show, (val) => {
      onShowChange(val)
    }, {
      // 初始化时需要执行一次
      immediate: true,
    })

    return () => {
      const renderMaskBg = () => {
        return (
          <DcMotion
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ opacity: 1, backgroundColor: ['rgba(0, 0, 0, 0.2)'] }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            class={['absolute top-0 left-0 w-full h-full bg-black/20']}
            show={animationShow.value}

            onEnterComplete={() => emit('afterShow')}
            onExitComplete={onExitComplete}
            onClick={() => props.clickable && emit('update:show', false)}
            >
              {slots.internal?.()}
          </DcMotion>
        )
      }

      return (
        internalShow.value && <div class={['fixed w-full h-full top-0 left-0 z-[var(--mask-z)]']}>
              {renderMaskBg()}
              {/* mask content */}
              {slots.default?.({ animationShow: animationShow.value, internalShow: internalShow.value })}
          </div>
      )
    }
  },
},
)
