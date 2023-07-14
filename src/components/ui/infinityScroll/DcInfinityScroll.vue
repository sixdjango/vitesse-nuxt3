<script setup lang="tsx" generic="T extends UnionBasis">
import type { InfinityScrollEvents, InfinityScrollProps, InfinityScrollSlots } from './types'
import { usePagingScroll } from '~/components/ui/hooks/usePagingScroll'

const props = defineProps <InfinityScrollProps<T>>()
const emits = defineEmits<InfinityScrollEvents<T>>()
const scrollRef = ref<HTMLElement | Document | null>(null)
const items = toRef(props, 'items')
defineSlots<InfinityScrollSlots<T>>()

const { dataSource } = usePagingScroll(
  scrollRef,
  props.fetchItemsFn,
  {
    dataSource: items,
    setDataSource: v => (emits('update:items', v)),
    pageSize: 5,
    ...useOmitBy(props, (v, k) => (k === 'items' || !v)),
  })
</script>

<template>
  <div ref="scrollRef" class="overflow-auto">
    <template v-for="(item, i) in dataSource" :key="`${useUniqueId('infinity')}-${i}`">
      <slot v-if="$slots.item" name="item" :item="item" :index="i" />
      <div v-else>
        {{ item }}
      </div>
    </template>
  </div>
</template>
