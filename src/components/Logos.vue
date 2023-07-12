<template>
  <div inline-flex text-2xl font-300 cursor-default>
    <div flex flex-col children:mx-auto>
      <img w-100 h-100 inline-block src="/nuxt.svg" class=" gsap fade-left-100">
      <span text-green5 mt--2 class="gsap fade-bottom-100">Nuxt 3</span>
    </div>
    <div
      text="3xl gray4"
      m="x-4 y-auto"
      transition-all-500
      transform
      hover:rotate-135
      i-carbon-add
    />
    <div flex flex-col children:mx-auto>
      <img w-100 h-100 inline-block class="gsap fade-right-100" src="/vite.png">
      <span text-purple5 mt--2 class="gsap fade-top-100">Vitesse</span>
    </div>
  </div>
</template>
