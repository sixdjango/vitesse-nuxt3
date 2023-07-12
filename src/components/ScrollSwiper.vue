<script setup>

</script>

<template>
  <div class="max-w-600 overflow-hidden m-auto">
    <div class="scroll-swiper-container flex flex-nowrap w-3600">
      <div class="description w-600  h-600 gsap scroll-swiper bg-blue">
        <div>
          <h1>Horizontal snapping sections (simple)</h1>
          <p>Scroll vertically to scrub the horizontal animation. It also dynamically snaps to the sections in an organic way based on the velocity. The snapping occurs based on the natural ending position after momentum is applied, not a simplistic "wherever it is when the user stops".</p>
          <div class="scroll-down">
            Scroll down<div class="arrow" />
          </div>
        </div>
      </div>

      <section class="w-600 h-600 gsap scroll-swiper bg-red">
        ONE
      </section>
      <section class="w-600 h-600 gsap scroll-swiper bg-orange">
        TWO
      </section>
      <section class="w-600 h-600 gsap scroll-swiper bg-purple">
        THREE
      </section>
      <section class="w-600 h-600 gsap scroll-swiper bg-green">
        FOUR
      </section>
      <section class="w-600 h-600 gsap scroll-swiper bg-gray">
        FIVE
      </section>
    </div>
  </div>
</template>
