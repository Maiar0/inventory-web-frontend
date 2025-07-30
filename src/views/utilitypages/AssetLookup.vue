<template>
    <input type="text" v-model="searchQuery" placeholder="Search assets..." />
    <div v-for="asset in filteredAssets" class="assets-grid">
        <p>{{ asset.name }}</p>
        <img v-if="asset.image_url" :src="backend_url + asset.image_url" alt="Asset Image" class="asset-image"
            @click="openAsset(asset)" style="cursor:pointer" />
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
const backend_url = import.meta.env.VITE_PUBLIC_URL;
import { useCacheManager } from '../../composables/useCacheManager';
const { getData } = useCacheManager();
const assets = ref([]);
onMounted(() => {
    fetchAssets();
});
const searchQuery = ref('');
const filteredAssets = computed(() => {
    if (!searchQuery.value) return assets.value;
    const q = searchQuery.value.toLowerCase();
    return assets.value.filter(asset => asset.name.toLowerCase().includes(q));
});
async function fetchAssets() {
    getData('assets').then(result => {
        if (result && result.data) {
            assets.value = result.data;
        } else {
            console.error('No data found in the response');
        }
    }).catch(error => {
        console.error('Error fetching assets:', error);
    });
}
function openAsset(asset) {
    const url = backend_url + asset.image_url;
    window.open(url, '_blank');
}
</script>
<style scoped>
.assets-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.asset-image {
    width: 25%;
    height: 25%;
    object-fit: cover;
}
</style>