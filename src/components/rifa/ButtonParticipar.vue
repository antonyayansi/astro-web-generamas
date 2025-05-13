<template>
    <button 
        @click="newParcipante()" 
        v-if="!openModal"
        class="w-full dark:bg-white dark:text-zinc-800 bg-zinc-900 text-white font-medium rounded-md px-4 py-2">Participar</button>
    <form v-if="openModal && !isCompleted"
        class="grid grid-cols-2 gap-2 p-4 border mt-3 rounded-md shadow dark:border-zinc-700"
        @submit.prevent="onSubmit">
        <div class="col-span-2">
            <label class="text-sm font-medium text-zinc-500">Nombres</label>
            <input v-model="new_participante.nombres"
                class="outline-none dark:bg-zinc-950 dark:border-zinc-700 border w-full rounded-md p-2 focus:ring-2 focus:ring-zinc-950 focus:dark:ring-zinc-100" />
        </div>
        <div class="col-span-1">
            <label class="text-sm font-medium text-zinc-500">DNI</label>
            <input type="number" v-model="new_participante.codigo"
                class="outline-none dark:bg-zinc-950 dark:border-zinc-700 border w-full rounded-md p-2 focus:ring-2 focus:ring-zinc-950 focus:dark:ring-zinc-100" />
        </div>
        <div class="col-span-1">
            <label class="text-sm font-medium text-zinc-500">NRC</label>
            <input v-model="new_participante.nrc"
                class="outline-none dark:bg-zinc-950 dark:border-zinc-700 border w-full rounded-md p-2 focus:ring-2 focus:ring-zinc-950 focus:dark:ring-zinc-100" />
        </div>
        <div class="col-span-2">
            <label class="text-sm font-medium text-zinc-500">Teléfono</label>
            <input type="number" v-model="new_participante.telefono"
                class="outline-none dark:bg-zinc-950 dark:border-zinc-700 border w-full rounded-md p-2 focus:ring-2 focus:ring-zinc-950 focus:dark:ring-zinc-100" />
        </div>
        <div class="col-span-2">
            <label class="text-sm font-medium text-zinc-500">Subir comprobante</label>
            <label v-if="!new_participante.voucher" for="voucher">
                <input @change="changeFile" type="file" id="voucher" hidden class="w-full">
                <div
                    class="w-full hover:border-zinc-900 dark:hover:border-zinc-100 cursor-pointer text-center flex items-center justify-center border border-dashed p-2 rounded-md dark:border-zinc-700 bg-white dark:bg-zinc-950">
                    <h1 class="text-zinc-700 dark:text-zinc-300">Has click para subir un archivo
                    </h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                    </svg>
                </div>
            </label>
            <div v-else class="p-2 rounded-md space-x-2 bg-sky-100 dark:bg-sky-900 flex justify-between">
                <div class="contenedor text-zinc-800 hover:underline cursor-pointer dark:text-white">
                    <h1 class="font-medium">{{ new_participante.voucher.name }}</h1>
                </div>
                <button @click="new_participante.voucher = null"
                    class="text-zinc-800 dark:text-white hover:text-red-500 dark:hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="col-span-2">
            <button :disabled="isLoadingSubmit" :class="isLoadingSubmit ? 'opacity-50 cursor-not-allowed' : ''"
                type="submit"
                class="w-full dark:bg-sky-400 dark:hover:bg-sky-500 dark:text-zinc-800 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-md px-4 py-2">Registrarme</button>
        </div>
        <div class="col-span-2">
            <p class="text-sm text-zinc-500">Al registrarte aceptas los <a href="/rifas/terminos"
                    class="text-sky-500 hover:underline">terminos y condiciones</a></p>
            <button v-if="openModal" @click="openModal = false"
                class="px-2 py-1 text-zinc-900 underline dark:text-zinc-100">Cancelar</button>
        </div>
    </form>
    <div v-if="isCompleted" class="mb-4 space-y-2">
        <div class="text-center">
            <p class="text-2xl font-bold">¡Gracias por participar!</p>
            <p class="text-sm text-zinc-500">Tu ticket ha sido generado</p>
        </div>
        <CardRifa ref="cardRef" />
        <div>
            <button @click="resetForm()" class="px-2 py-1 text-zinc-900 underline dark:text-zinc-100">Cerrar</button>
            <button @click="saveAsImage()" class="px-2 py-1 text-zinc-900 underline dark:text-zinc-100">Guardar imagen</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import useRifas from '@/hooks/useRifas';
import CardRifa from './CardRifa.vue'
import html2canvas from 'html2canvas'

const cardRef = ref(null)

const {
    isLoadingSubmit,
    openModal,
    onSubmit,
    new_participante,
    isCompleted
} = useRifas()

const saveAsImage = async () => {
  if (!cardRef.value) return

  const element = cardRef.value.$el || cardRef.value // dependiendo de cómo esté definido CardRifa
  const canvas = await html2canvas(element)
  const image = canvas.toDataURL('image/png')

  const link = document.createElement('a')
  link.href = image
  link.download = 'cardrifa.png'
  link.click()
}

const newParcipante = () => {
    new_participante.value = {
        rifas_id: null,
        nombres: '',
        codigo: '',
        nrc: '',
        registrado_por: '',
        voucher: ''
    }
    openModal.value = true
    isCompleted.value = false
}

const resetForm = () => {
    openModal.value = false
    new_participante.value = {
        rifas_id: null,
        nombres: '',
        codigo: '',
        nrc: '',
        registrado_por: '',
        voucher: ''
    }
    isCompleted.value = false
}

const changeFile = (e) => {
    const file = e.target.files[0]
    if (file) {
        new_participante.value.voucher = file
    }
}
</script>