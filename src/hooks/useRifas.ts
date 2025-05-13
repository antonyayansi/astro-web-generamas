import { storeToRefs } from 'pinia'
import { rifas } from '@/store/rifas'

const useRifas = () => {
  const storeRef = storeToRefs(rifas())

  return {
    ...storeRef,
    getRifas: rifas().getRifas,
    getRifaId: rifas().getRifaId,
    onSubmit: rifas().onSubmit,
  }
}

export default useRifas
