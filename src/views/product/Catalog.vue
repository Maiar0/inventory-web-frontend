<template>
    <div v-if="isLoading('catalog')" class="loading">
        Loading catalog...
    </div>
    <div v-else-if="error" class="error">
        Error loading catalog: {{ error }}
    </div>
    <div v-else>
        <CatalogHeader @select="goToCart" />
        <input class="filter" v-model="searchQuery" type="text" placeholder="Search Products" />
        <CatalogGrid :items="catalogFilteredItems" @select="goToItem" @addToCart="addItemToCart" />
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CatalogGrid from '../../components/CatalogGrid.vue'
import CatalogHeader from '../../components/CatalogHeader.vue';
import { useCart } from '../../composables/useCart';
import { useCacheManager } from '../../composables/useCacheManager';
const router = useRouter();
const { addItem } = useCart();
const searchQuery = ref('');

const { getData, isLoading, getError } = useCacheManager();
const catalogData = ref([]);
const catalogItems = ref([]);
const error = ref(null);
onMounted(async () => {//populate catalog Data
    try {
        const catalogCache = await getData('catalog');
        catalogData.value = catalogCache.data;

        catalogItems.value = catalogData.value.map(item => ({
            ...item,
            price: 1.00
        }));
    } catch (err) {
        error.value = err;
        console.error('[Catalog.vue]Error fetching catalog data:', err);
    }
})
watch(//watch for catalog data to change
    () => catalogData.value,
    (newData) => {
        console.log('Catalog data updated:', newData);
    },
    { deep: true }
);


const populate = () => {
    //fetch catalog items from API in real app
};
const catalogFilteredItems = computed(() => {
    if (!searchQuery.value) return catalogItems.value;
    const q = searchQuery.value.toLocaleLowerCase();
    return catalogItems.value.filter(item =>
        item.name.toLocaleLowerCase().includes(q) ||
        item.sku.toLocaleLowerCase().includes(q) ||
        item.product_id.toLocaleLowerCase().includes(q)
    );
});
function goToItem() {
    console.log('click go to item')
    //will go to product page
}
function addItemToCart(item) {
    addItem(item.id, item.quantity);
}
function goToCart(where) {
    router.push('/cart')
}

</script>
<style scoped>
.filter {
    display: block;
    width: 60%;
    margin: 10px auto;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>