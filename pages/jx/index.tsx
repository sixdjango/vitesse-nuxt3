import { NxButton } from 'naive-ui'
import type { ChildRef } from '~/components/Child'
import Child from '~/components/Child'
import FComponent from '~/components/MotionScroll'

export default defineComponent({
  props: {

  },
  setup: (props, { slots, emit, expose }) => {
    consola.info('jx page')

    definePageMeta({
      layout: 'home',
    })

    const counter = ref(0)
    const childRef = ref<ChildRef>()

    return () => (
      <div>
        jsx page
        <FComponent message='good' />
        <Child ref={childRef}></Child>
        <span>count: {counter.value}</span>
        <NxButton onClick={() => counter.value++}>++</NxButton>
        <NxButton onClick={() => childRef.value?.showMe()}>click child show me</NxButton>
      </div>
    )
  },
})
