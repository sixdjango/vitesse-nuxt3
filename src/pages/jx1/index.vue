<script setup lang="ts">
</script>

<template>
  <div>
    jsx page
    <Child ref="" />
    <MotionOne :initial="{ opacity: 0, x: 100 }" :in-view="{ opacity: 1, x: 0 }" :transition="{ easing: 'ease', duration: 1 }">
      <div>dsada</div>
    </MotionOne>
  </div>
</template>
