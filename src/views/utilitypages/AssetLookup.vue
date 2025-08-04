<template>
    <div class="container">
        <div class="mb-lg">
            <input type="text" v-model="searchQuery" placeholder="Search assets..."
                class="w-full max-w-md mx-auto block" />
        </div>

        <div class="grid grid-4 gap-lg">
            <div v-for="asset in filteredAssets" :key="asset.name" class="card text-center">
                <div class="card-body">
                    <h3 class="text-lg font-semibold mb-sm">{{ asset.name }}</h3>
                    <img v-if="asset.image_url" :src="backend_url + asset.image_url" alt="Asset Image"
                        class="asset-image cursor-pointer" @click="openAsset(asset)" />
                </div>
            </div>
        </div>
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
/* Component-specific styles only */
.cursor-pointer {
    cursor: pointer;
}

.max-w-md {
    max-width: 28rem;
}

.asset-image {
    width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    transition: transform var(--transition-fast);
}

.asset-image:hover {
    transform: scale(1.05);
}
</style>