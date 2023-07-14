<script setup lang="ts">
import { Motion } from '@motionone/vue'
</script>

<template>
  <div flex flex-col items-center justify-center>
    <div class="h-50px w-50px bg-black gsap fade-left-100" />
    <div class="h-400px" />
    <Motion :in-view="{ opacity: 1, x: [100, 0] }" :in-view-options="{ once: true }" :transition="{ easing: 'ease', duration: 1 }">
      <div class="h-50 w-50 bg-black " />
    </Motion>
  </div>
</template>
