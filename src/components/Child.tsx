import { Motion } from '@motionone/vue'
import { NButton } from 'naive-ui'
import { consola } from '../utils/consola'

export interface ChildRef extends VNode {
  message: string
  showMe: () => void
}

export default defineComponent(
  {
    name: 'Child',
    setup: (props, { slots, emit, expose }) => {
      expose({
        message: 'goodddd',
        showMe: () => {
          consola.log('show me')
        },
      })

      const a = ref('dd')
      const v = ref(0)
      a.value = 'ddddd'

      return () => {
        return (
          <div class={['']}>
            <span>child</span>
            <span>{props.message}</span>
            <span>{a.value}</span>
            <div>{v.value}</div>
            <Motion inView={{ opacity: [0, 1] }} inViewOptions={{ once: true }}>d</Motion>
            <NButton onClick={() => v.value++}>++</NButton>
          </div>
        )
      }
    },
  },
)
