import { blocminApi } from '@/utils/blocminApi'
import { defineStore } from 'pinia'
import confetti from 'canvas-confetti'

const formatDate = (date) => {
  const dateObj = new Date(date)
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return dateObj.toLocaleDateString('es-ES', options)
}

const formatTime = (date) => {
  const timeObj = new Date(date)
  const options = { hour: '2-digit', minute: '2-digit' }
  const hora = timeObj.toLocaleTimeString('es-ES', options)
  //AM or PM
  return `${hora}`
}

const emojis = ['🐝', '🥑', '🍉', '🍓', '🍇', '😈', '😎', '😜', '😱', '🔋', '💎', '🎁', '🦄']

const getEmojiRnd = () => {
  const randomIndex = Math.floor(Math.random() * emojis.length)
  return emojis[randomIndex]
}

export const rifas = defineStore('rifas', {
  state: () => ({
    isCompleted: false,
    isLoading: false,
    isLoadingSubmit: false,
    rifas: [],
    rifa: null,
    openModal: false,
    new_participante: {
      rifas_id: null,
      nombres: '',
      codigo: '',
      nrc: '',
      registrado_por: '',
      voucher: '',
    },
    ticket: {
      codigo: '',
      dni: '',
      nombres: '',
      emoji: '🌳',
      fecha: '',
      hora: '',
    },
  }),
  actions: {
    async getRifas() {
      try {
        const { data } = await blocminApi.get('/rifas')
        this.rifas = data
      } catch (e) {
        console.log(e)
      }
    },
    async getRifaId(id) {
      this.isLoading = true
      try {
        const { data } = await blocminApi.get(`/rifas/${id}`)
        this.rifa = data
      } catch (e) {
        console.log(e)
        window.location.href = '/rifas'
      } finally {
        this.isLoading = false
      }
    },
    async onSubmit() {
      this.isLoadingSubmit = true
      this.new_participante.rifas_id = this.rifa.rifa.id

      let formData = new FormData()
      formData.append('rifas_id', this.new_participante.rifas_id)
      formData.append('nombres', this.new_participante.nombres)
      formData.append('codigo', this.new_participante.codigo)
      formData.append('nrc', this.new_participante.nrc)
      formData.append('registrado_por', this.new_participante.registrado_por)
      formData.append('voucher', this.new_participante.voucher)

      try {
        const { data } = await blocminApi.post('/rifas', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Gen': 'd8b88034-401e-41f1-b619-7f32d0a2fd5e',
          },
        })
        this.ticket.codigo = parseInt(data.codigo).toString().padStart(6, '0')
        this.ticket.dni = data.dni
        this.ticket.nombres = data.nombres
        this.ticket.fecha = formatDate(data.created_at)
        this.ticket.hora = formatTime(data.created_at)
        this.ticket.emoji = getEmojiRnd()
        this.isCompleted = true

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoadingSubmit = false
      }
    },
  },
})
