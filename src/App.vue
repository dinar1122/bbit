<template>
  <header class="bg-gray-50 p-4 border-b mb-5">
    <div class="flex items-center justify-center space-x-2">
      <input
        id="firstName"
        class="flex h-9 w-[300px] rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50 selection:bg-black selection:text-white"
        type="text"
        placeholder="Введите запрос"
        v-model="searchValue"
      />
      <button
        class="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50"
        @click="fetchPhotos(searchValue)"
      >
        Поиск
      </button>
    </div>
  </header>
  <main class="flex place-content-center">
    <div class="text-2xl" v-if="loading"><Loader /></div>
    <div class="text-2xl" v-else-if="isEmpty">Данных нет</div>
    <div class="text-2xl" v-else-if="error">{{ error }}</div>
    <Table v-else @load-more="loadMore"></Table>
  </main>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useAlbumStore } from './stores/album'
import Table from './components/Table.vue'
import Loader from './components/ui/Loader.vue'
import { onMounted } from 'vue'
const searchValue = ref(2)

const albumStore = useAlbumStore()
const { loading, error, isEmpty } = toRefs(albumStore)

const { fetchPhotos, loadMore } = albumStore

onMounted(() => {
  fetchPhotos()
})
</script>
