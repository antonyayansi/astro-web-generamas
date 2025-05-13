<template>
  <Transition name="fade">
      <div
          v-show="show"
          @dblclick.self="close" 
          class="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-10 justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto h-screen max-h-full">
          <div class="relative w-full max-w-2xl">
              <!-- Modal content -->
              <div class="relative bg-white rounded-md shadow dark:bg-zinc-800">
                  <!-- Modal header -->
                  <div class="flex items-center justify-between p-2 px-4 border-b rounded-t dark:border-zinc-700">
                      <h3 class="text-xl max-text font-semibold text-zinc-900 dark:text-white">
                          {{ title }}
                      </h3>
                      <button
                          @click="close" 
                          type="button" class="text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-md text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-zinc-600 dark:hover:text-white">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  <!-- Modal body -->
                  <div class="px-4 py-2">
                     <slot />
                  </div>
              </div>
          </div>
      </div>
  </Transition>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  title: {
      type: String,
      default: 'Modal'
  },
  show: {
      type: Boolean,
      default: false
  }
})

const emits = defineEmits([
  'close'
])

const close = () => {
  emits('close')
}

onMounted(() => {
  /** Evento para cerrar ventanas emergentes */
  document.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
          close()
      }
  });
})

</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
opacity: 0;
}

.max-text {
max-width: 300px; /* Ajusta el ancho según tus necesidades */
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
</style>
