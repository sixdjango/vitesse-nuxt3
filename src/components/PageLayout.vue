<script setup lang="ts">
onMounted(() => {
  // 由于 nuxt 渲染方式为 混合渲染放肆，第一次 ssr，之后都是 csr 所以需要放在 onMounted 中。避免切换路由不执行动画注册
  useRegisterCommonGsap()
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
