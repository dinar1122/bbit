<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
      <tr>
        <th @click="$emit('sort', 'id')" class="px-3 py-3 cursor-pointer">ID</th>
        <th @click="$emit('sort', 'albumId')" class="px-3 py-3 cursor-pointer">Альбом</th>
        <th @click="$emit('sort', 'title')" class="px-3 py-3 cursor-pointer">Название</th>
        <th @click="$emit('sort', 'url')" class="px-3 py-3 cursor-pointer">Ссылка</th>
        <th @click="$emit('sort', 'thumbnailUrl')" class="px-3 py-3 cursor-pointer">Миниатюра</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in displayedData"
        :key="item.id"
        class="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700 border-gray-200"
      >
        <th class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
          {{ item.id }}
        </th>
        <td class="px-3 py-4">{{ item.albumId }}</td>
        <td class="px-3 py-4 max-w-[80px] truncate">{{ item.title }}</td>
        <td class="px-3 py-4 max-w-[80px] truncate">
          <a
            :href="item.url"
            class="font-medium text-blue-600 light:text-blue-500 hover:underline"
            >{{ item.url }}</a
          >
        </td>
        <td class="px-3 py-4 max-w-[80px] truncate">
          <a
            :href="item.thumbnailUrl"
            class="font-medium text-blue-600 light:text-blue-500 hover:underline"
            >{{ item.thumbnailUrl }}</a
          >
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5">
          <div ref="loadMoreTrigger" class="h-4"></div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAlbumStore } from '@/stores/album'
import { storeToRefs } from 'pinia'

const props = defineProps({
  displayedData: {
    type: Array,
    required: true,
  },
})

const loadMoreTrigger = ref(null)
let observer = null

const albumStore = useAlbumStore()
const { loading } = storeToRefs(albumStore)

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !loading.value) {
        emit('load-more')
      }
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    },
  )

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const emit = defineEmits(['sort', 'load-more'])
</script>
