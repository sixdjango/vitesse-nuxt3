<script setup lang="ts">
interface Props {
  msg: string
}

defineProps<Props>()
</script>

<template>
  <div>
    <div class="h-300 bg-gray/60">
      second child
    </div>
  </div>
</template>
