<script setup lang="ts">
import { Presence } from '@motionone/vue'

const show = ref(true)
</script>

<template>
  <div>
    <Presence>
      <div>
        <DcMotion v-if="show" :initial="{ opacity: 0 }" :animate="{ opacity: 1, scale: 1 }" :exit="{ opacity: 0 }">
          <div class="h-300px bg-gray/60">
            a
          </div>
        </DcMotion>
      </div>
    </Presence>
    <NButton @click="show = !show">
      hide
    </NButton>
  </div>
</template>
