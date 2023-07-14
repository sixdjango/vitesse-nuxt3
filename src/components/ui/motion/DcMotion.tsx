import { Motion, Presence } from '@motionone/vue'
import type { AnimationOptionsWithOverrides, CustomPointerEvent, InViewOptions, MotionEvent, MotionState, VariantDefinition, ViewEvent } from '@motionone/dom'
import type { CSSProperties, HtmlHTMLAttributes, SlotsType } from 'vue-demi'

const dcMotionProps = {
  tag: {
    type: String,
    default: 'div',
  },
  initial: {
    type: [Object, Boolean] as PropType<VariantDefinition | boolean>,
  },
  animate: objectType<VariantDefinition>(),
  inView: objectType<VariantDefinition>(),
  hover: objectType<VariantDefinition>(),
  press: objectType<VariantDefinition>(),
  exit: objectType<VariantDefinition>(),
  inViewOptions: objectType<InViewOptions & { once?: boolean }>(),
  transition: objectType<AnimationOptionsWithOverrides>(),
  style: objectType<CSSProperties>(),
  exitType: {
    type: String as PropType<'if' | 'show' >,
    default: 'if',
  },
  show: {
    type: Boolean,
    default: true,
  },
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
} as const

export type DcMotionProps = ExtractPublicPropTypes<typeof dcMotionProps>

type InternalProps = ExtractPropTypes<typeof dcMotionProps>
type DcNodeProps = Omit<HtmlHTMLAttributes, keyof InternalProps>
type MergedProps = Partial<InternalProps & DcNodeProps>

export const dcMotionEmits = {
  start: (e: MotionEvent) => (typeof e === 'object'),
  complete: (e: MotionEvent) => typeof e === 'object',
  enterStart: (e: MotionEvent) => typeof e === 'object',
  enterComplete: (e: MotionEvent) => typeof e === 'object',
  exitStart: (e: MotionEvent) => typeof e === 'object',
  exitComplete: (e: MotionEvent) => typeof e === 'object',
  hoverStart: (e: CustomPointerEvent) => typeof e === 'object',
  hoverEnd: (e: CustomPointerEvent) => typeof e === 'object',
  pressStart: (e: CustomPointerEvent) => typeof e === 'object',
  pressEnd: (e: CustomPointerEvent) => typeof e === 'object',
  viewEnter: (e: ViewEvent) => typeof e === 'object',
  viewLeave: (e: ViewEvent) => typeof e === 'object',
}

export default defineComponent({
  props: dcMotionProps,
  slots: Object as SlotsType<{
    default?: void
  }>,
  emits: dcMotionEmits,
  setup(props: MergedProps, { slots, emit }) {
    const motionRef = ref<{ state: MotionState; root: HTMLElement | null } >()
    const motionStart = (e: MotionEvent) => {
      emit('start', e)
      if (props.show === false && props.exit)
        emit('exitStart', e)
      else
        emit('enterStart', e)
    }
    const motionComplete = (e: MotionEvent) => {
      emit('complete', e)
      if (props.show === false && props.exit)
        emit('exitComplete', e)
      else
        emit('enterComplete', e)
    }

    const motionHoverStart = (e: CustomPointerEvent) => {
      emit('hoverStart', e)
    }

    const motionHoverEnd = (e: CustomPointerEvent) => {
      emit('hoverEnd', e)
    }

    const motionPressStart = (e: CustomPointerEvent) => {
      emit('pressStart', e)
    }

    const motionPressEnd = (e: CustomPointerEvent) => {
      emit('pressEnd', e)
    }

    const motionViewEnter = (e: ViewEvent) => {
      emit('viewEnter', e)
    }

    const motionViewLeave = (e: ViewEvent) => {
      emit('viewLeave', e)
    }

    onMounted(() => {
      const el = motionRef.value?.root
      el?.addEventListener('motionstart', motionStart)
      el?.addEventListener('motioncomplete', motionComplete)
      el?.addEventListener('hoverstart', motionHoverStart)
      el?.addEventListener('hoverend', motionHoverEnd)
      el?.addEventListener('pressstart', motionPressStart)
      el?.addEventListener('pressend', motionPressEnd)
      el?.addEventListener('viewenter', motionViewEnter)
      el?.addEventListener('viewleave', motionViewLeave)
    })

    onUnmounted(() => {
      const el = motionRef.value?.root
      el?.removeEventListener('motionstart', motionStart)
      el?.removeEventListener('motioncomplete', motionComplete)
      el?.removeEventListener('hoverstart', motionHoverStart)
      el?.removeEventListener('hoverend', motionHoverEnd)
      el?.removeEventListener('pressstart', motionPressStart)
      el?.removeEventListener('pressend', motionPressEnd)
      el?.removeEventListener('viewenter', motionViewEnter)
      el?.removeEventListener('viewleave', motionViewLeave)
    })

    // render function
    return () => {
      const renderMotion = () => {
        return (
          <Motion
          v-show={props.exitType === 'if' || props.show}
          ref={motionRef}
          {...props}
          >

          {slots.default?.()}
        </Motion>
        )
      }

      const renderPresence = () => {
        return (
          <Presence>
            {(props.show || props.exitType === 'show') && renderMotion()}
          </Presence>
        )
      }

      return props.exit ? renderPresence() : renderMotion()
    }
  },
})
