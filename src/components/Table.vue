<template>
  <div class="relative overflow-auto shadow-md m-5 w-[600px] h-[600px]">
    <TableItems :displayedData="displayedData" @sort="handleSort" @load-more="loadMore" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlbumStore } from '@/stores/album'
import { storeToRefs } from 'pinia'
import TableItems from './TableItems.vue'

const sortField = ref('id')
const sortDirection = ref('asc')
const pageSize = 30
const currentPage = ref(1)

const albumStore = useAlbumStore()
const { data, loading } = storeToRefs(albumStore)

const sortedData = computed(() => {
  return [...data.value].sort((a, b) => {
    const valA = a[sortField.value]
    const valB = b[sortField.value]
    return sortDirection.value === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1
  })
})

const displayedData = computed(() => {
  const offset = currentPage.value * pageSize
  return sortedData.value.slice(0, offset)
})

const hasMore = computed(() => currentPage.value * pageSize < data.value.length)

const loadMore = () => {
  if (hasMore.value) currentPage.value++
}

const handleSort = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
  currentPage.value = 1
}
</script>
