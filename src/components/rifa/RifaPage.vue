<template>
    <div v-if="rifas.length == 0">
        <h1 class="text-2xl font-bold text-center">No hay rifas disponibles</h1>
    </div>
    <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            <a v-for="rifa in rifas" :key="rifa.id" :href="`/rifas/detalle?r=${rifa.id}`" class="w-full">
                <div
                    class="bg-white hover:-translate-y-1 transition-transform duration-300 cursor-pointer dark:bg-zinc-950 border dark:border-zinc-700 
                        shadow rounded-lg p-4 flex flex-wrap">
                    <div class="w-3/4">
                        <p class="text-zinc-500">{{ formatTime(rifa.fecha_sorteo) }}</p>
                        <h2 class="text-xl font-bold">{{ rifa.nombre }}</h2>
                        <p class="text-zinc-500">Fecha de sorteo: {{ formatDate(rifa.fecha_sorteo) }}</p>
                        <p>{{ precioFormateado(rifa.precio ?? 0)  }}</p>
                    </div>
                    <div class="w-1/4 flex justify-end">
                        <img class="object-cover w-[100px] rounded-md" :src="`${fileURL}${rifa.imagen}`"
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup>
import useRifas from '@/hooks/useRifas';
import { fileURL } from '@/utils/blocminApi';
import { onMounted } from 'vue';

const precioFormateado = (precio) => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(precio)
}

const formatDate = (date) => {
    const dateObj = new Date(date);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return dateObj.toLocaleDateString('es-ES', options);
}

const formatTime = (time) => {
    const timeObj = new Date(time);
    const options = { hour: '2-digit', minute: '2-digit' };
    const hora = timeObj.toLocaleTimeString('es-ES', options);
    //AM or PM
    return `${hora} ${timeObj.getHours() >= 12 ? 'PM' : 'AM'}`;
}

const {
    getRifas,
    rifas,
} = useRifas();

onMounted(async () => {
    await getRifas()
})
</script>