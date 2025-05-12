import { create } from 'zustand'

export interface Rifa {
  id: string
  nombre: string
  precio: number
  imagen: string
  semilla: string
}

interface Participante {
  nombre: string
  codigo: string
  celular: string
  comprobante: File | null
}

interface RifaStore {
  rifas: Rifa[]
  setRifas: (data: Rifa[]) => void

  numerosSeleccionados: number[]
  seleccionarNumero: (num: number) => void
  quitarNumero: (num: number) => void

  participante: Participante
  setParticipante: (data: Participante) => void
}

export const useRifaStore = create<RifaStore>((set) => ({
  rifas: [],
  setRifas: (data) => set({ rifas: data }),

  numerosSeleccionados: [],
  seleccionarNumero: (num) =>
    set((state) => ({
      numerosSeleccionados: [...state.numerosSeleccionados, num],
    })),
  quitarNumero: (num) =>
    set((state) => ({
      numerosSeleccionados: state.numerosSeleccionados.filter((n) => n !== num),
    })),

  participante: { nombre: '', celular: '', comprobante: null, codigo: '' },
  setParticipante: (data) => set({ participante: data }),
}))
