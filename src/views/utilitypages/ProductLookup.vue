<template>
    <input type="text" v-model="searchQuery" placeholder="Search products..." />

    <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.sku" class="product-card">
            <p @click="openProduct(product)"><strong>{{ product.name + ' : ' + + product.product_id }}</strong></p>
            <p>{{ 'SKU: ' + product.sku }}</p>
            <p>{{ 'Description: ' + product.description }}</p>
            <a v-if="product.image_url" :href="backend_url + product.image_url" target="_blank"
                rel="noopener noreferrer">
                <img :src="backend_url + product.image_url" alt="product Image" class="product-image" />
            </a>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import ApiFetch from '../../api/ApiFetch';
const backend_url = import.meta.env.VITE_PUBLIC_URL + "/images/";
const api = new ApiFetch();
const products = ref([]);
const searchQuery = ref('');
const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value;
    const q = searchQuery.value.toLowerCase();
    return products.value.filter(product =>
        product.product_id == q ||
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q)
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
<style scoped>
input[type="text"] {
    display: block;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    width: 90%;
    max-width: 500px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.product-card {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    text-align: center;
}

.product-card p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
}

.product-image {
    width: 100%;
    height: 150px;
    /* or whatever space you want */
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
    display: block;
    margin: 0 auto;
}
</style>
