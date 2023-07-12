import { NButton, useMessage } from 'naive-ui'
import { ref } from 'vue'

export default defineComponent({
  setup(props, { slots, expose }) {
    const count = ref(1)
    const q = ref('2')
    expose({ count })
    const message = useMessage()

    const onToast = () => {
      message.success(() => <div>dd</div>, { duration: 1000 })
    }
    // 返回渲染函数
    return () => {
      return (
        <div>
          <NButton onClick={() => count.value++}>count++</NButton>
          <NButton onClick={onToast}>tost</NButton>
           <div>{count.value}</div>
           <div>{q.value}</div>
        </div>
      )
    }
  },
},
)
