export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const objectType = <T>() => ({
  type: Object as PropType<T>,
})
