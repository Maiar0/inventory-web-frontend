<template>
    <input type="text" v-model="searchQuery" placeholder="Search products..." />
    <div v-for="product in filteredProducts" class="products-grid">
        <p>{{ product.name }}</p>
        <p>{{ product.sku }}</p>
        <p>{{ product.description }}</p>
        <img v-if="product.image_url" :src="backend_url + product.image_url" alt="product Image" class="product-image"
            @click="openProduct(product)" style="cursor:pointer" />
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import ApiFetch from '../../api/ApiFetch';
const backend_url = import.meta.env.VITE_PUBLIC_URL;
const api = new ApiFetch();
const products = ref([]);
const searchQuery = ref('');
const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value;
    const q = searchQuery.value.toLowerCase();
    return products.value.filter(product =>
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
    );
});
onMounted(() => {
    fetchProducts();
});
function fetchProducts() {
    api.fetch('/product/products', {
        method: 'GET'
    }).then(result => {
        console.log('Products fetched:', result);
        if (result && result.data) {
            products.value = result.data;
        } else {
            console.error('No data found in the response');
        }
    }).catch(error => {
        console.error('Error fetching products:', error);
    });
}
</script>