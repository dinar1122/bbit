import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Api } from '@/api/api'

export const useAlbumStore = defineStore('album', () => {
  const loading = ref(false)
  const error = ref(null)
  const data = ref([])

  const isEmpty = computed(() => data.value.length === 0)

  const fetchPhotos = async (id) => {
    try {
      loading.value = true
      data.value = await Api.fetchAlbumPhotoById(id)
    } catch (err) {
      error.value = err.message
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    isEmpty,
    fetchPhotos
  }
})
