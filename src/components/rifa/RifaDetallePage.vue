<template>
    <div class="max-w-[800px] mx-auto px-4 py-8">
        <!-- <h1 class="text-2xl font-bold text-center">Rifa Detalle</h1> -->
        <svg v-if="isLoading" class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24">
            <defs>
                <linearGradient id="mingcuteLoadingFill0" x1="50%" x2="50%" y1="5.271%" y2="91.793%">
                    <stop offset="0%" stop-color="currentColor" />
                    <stop offset="100%" stop-color="currentColor" stop-opacity="0.55" />
                </linearGradient>
                <linearGradient id="mingcuteLoadingFill1" x1="50%" x2="50%" y1="15.24%" y2="87.15%">
                    <stop offset="0%" stop-color="currentColor" stop-opacity="0" />
                    <stop offset="100%" stop-color="currentColor" stop-opacity="0.55" />
                </linearGradient>
            </defs>
            <g fill="none">
                <path
                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path fill="url(#mingcuteLoadingFill0)"
                    d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
                    transform="translate(1.5 1.625)" />
                <path fill="url(#mingcuteLoadingFill1)"
                    d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
                    transform="translate(1.5 1.625)" />
            </g>
        </svg>
        <div v-if="rifa" class="grid grid-cols-3 gap-4">
            <div class="col-span-3 md:col-span-1">
                <img :src="`${fileURL}${rifa?.rifa.imagen}`" class="w-full rounded-md mt-2" />
                <div class="mt-2">
                    <p class="text-sm text-zinc-500">Organizado por</p>
                    <h1 class="font-bold text-xl">Genera+</h1>
                </div>
                <div v-if="rifa?.participantes" class="mt-2">
                    <p class="text-sm text-zinc-500">Participantes </p>
                    <div class="flex -space-x-2 mt-4">
                        <template v-for="(p, index) in rifa?.participantes.slice(0, 5)" :key="p.id">
                            <div class="inline-flex items-center justify-center size-8 rounded-full ring-2 ring-white text-white dark:ring-black text-sm font-bold uppercase"
                                :class="bgColors[index % bgColors.length]" :title="p.nombres">
                                {{ p.nombres.charAt(0) }}
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-span-3 md:col-span-2 space-y-2">
                <h1 class="text-3xl font-bold">{{ rifa?.rifa.nombre }}</h1>
                <p class="flex items-center space-x-2 text-sm text-zinc-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path fill="currentColor"
                            d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z" />
                    </svg>
                    <span>{{ getFormatDate(rifa?.rifa.fecha_sorteo) }}</span>
                </p>
                <p>Precio: <strong>{{ precioFormateado(rifa?.rifa.precio ?? 0) }}</strong></p>
                <div class="py-2">
                    <ButtonParticipar />
                </div>
                <div class="pt-2 space-y-2">
                    <p class="text-sm text-zinc-500">Descripción</p>
                    <hr class="border-1 dark:border-zinc-700" />
                    <div v-html="rifa?.rifa.descripcion"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useRifas from '@/hooks/useRifas'
import { fileURL } from '@/utils/blocminApi'
import ButtonParticipar from './ButtonParticipar.vue'
const params = new URLSearchParams(window.location.search)
const rifaId = params.get('r')

const precioFormateado = (precio) => {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2,
    }).format(precio)
}

const bgColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500'
]

const mesMap = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Setiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
}

const getFormatDate = (fecha) => {
    const date = new Date(fecha)
    const mes = date.getMonth() + 1;

    return `${date.getDate()} ${mesMap[mes]} ${date.getFullYear()} `
}

const {
    getRifaId,
    rifa,
    isLoading
} = useRifas()
getRifaId(rifaId)    
</script>