<template>
  <div
    class="relative w-full h-[250px] rounded-3xl bg-sky-700 text-white shadow-2xl overflow-hidden flex flex-col justify-between pl-12 p-6 font-mono"
    :style="{
      transform: cardTransform,
      transition: 'transform 0.25s ease-out'
    }" ref="target">
    <!-- Fondo -->
    <img class="absolute inset-0 w-[200px] left-40 top-4 object-cover -z-10 opacity-30" src="/img/logos.png" />

    <!-- Código lateral -->
    <div
      class="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 rotate-90 text-2xl font-bold text-white tracking-wider">
      #{{ticket?.codigo}}
    </div>

    <!-- Perfil y datos -->
    <div class="flex items-center gap-4">
      <div>
        <h2 class="text-lg font-bold">{{ ticket?.nombres }}</h2>
        <span class="bg-white/20 text-white text-xs px-2 py-1 rounded">{{ ticket?.dni }}</span>
      </div>
    </div>

    <!-- Icono -->
    <div class="flex justify-center items-center">
      <div class="w-28 h-28 bg-white/10 border-2 border-white/20 rounded-xl flex items-center justify-center">
        <span class="text-5xl">{{ ticket.emoji }}</span>
      </div>
    </div>

    <!-- Fecha y hora -->
    <div class="absolute top-6 right-6 text-right text-sm">
      <p class="font-semibold">{{ ticket.fecha }}</p>
      <p class="text-white/70 text-xs">{{ ticket.hora }} PE</p>
    </div>

    <div class="absolute bottom-2 right-6 text-xs flex items-center gap-2">
      <a class="underline">generamas.club</a>
    </div>

    <!-- Sponsors -->
    <div class="absolute bottom-6 left-12 text-xs text-white/60">
      Gracias a:
      <div class="flex gap-2 mt-1">
        <span>Genera+</span>
      </div>
    </div>
  </div>

</template>

<script setup>
import { computed, ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'
import useRifas from '@/hooks/useRifas'

const {
  ticket
} = useRifas()

const target = ref(null)
const {
  elementX,
  elementY,
  isOutside,
  elementHeight,
  elementWidth,
} = useMouseInElement(target)

const cardTransform = computed(() => {
  const MAX_ROTATION = 8
  const rX = (MAX_ROTATION / 2 -
    (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2)

  const rY = (-(MAX_ROTATION / 2) +
    (elementX.value / elementWidth.value) * MAX_ROTATION
  ).toFixed(2)

  return isOutside.value
    ? `perspective(${elementWidth.value}px) rotateX(0deg) rotateY(0deg)`
    : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`

})
</script>