<script setup lang="ts" generic="T extends string | number, U extends {a:string}">
defineProps<{
  id: T
  list: U[]
}>()

defineEmits(['update:list'])

defineSlots<{
  default: (props: { item: U }) => VNode
}>()
</script>

<template>
  <div>
    <div v-for="item in list" :key="item.a">
      <slot :item="item" />
    </div>
  </div>
</template>
