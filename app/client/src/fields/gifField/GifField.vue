<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  apiKey: string;
  topic: string;
}>();

const limit = 4;

const url = ref('');

const loading = computed(() => url.value === '');

fetch(`https://g.tenor.com/v1/search?q=${props.topic}&key=${props.apiKey}&limit=${limit}`)
  .then(response => response.json())
  .then(({ results }) => {
    const showGif = (index: number = 0) => {
      setTimeout(() => {
        url.value = results[index].media[0].gif.url;

        if (index < limit - 1) {
          showGif(index + 1);
        }
      }, index > 0 ? 3000 : 800)
    };

    showGif();
  });
</script>

<template>
  <div class="wrapper">
    <p v-if="loading">Loading...</p>
    <img v-else :src="url" />
  </div>
</template>

<style scoped>
.wrapper {
  margin-bottom: 24px;
}
</style>
