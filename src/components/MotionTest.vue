<script setup lang="ts">
</script>

<template>
  <div>
    <MotionOne :initial="{ opacity: 0 }" :animate="{ opacity: 1, scale: 1 }">
      <div class="h-300 bg-gray/60">
        a
      </div>
    </MotionOne>
  </div>
</template>
