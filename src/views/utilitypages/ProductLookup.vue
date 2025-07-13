<template>
    <input type="text" v-model="searchQuery" placeholder="Search products..." />
    <div class="products-grid">
        <div v-for="product in filteredProducts" class="products-grid">
            <p>{{ product.name }}</p>
            <p>{{ product.sku }}</p>
            <p>{{ product.description }}</p>
            <img v-if="product.image_url" :src="backend_url + product.image_url" alt="product Image"
                class="product-image" @click="openProduct(product)" style="cursor:pointer" />
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
<style scoped>
input[type="text"] {
    display: block;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    width: 80%;
    max-width: 500px;
    font-size: 1rem;
    border-radius: 6px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.products-grid>div {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    transition: box-shadow 0.2s ease;
}

.products-grid>div:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.products-grid p {
    margin: 0.5rem 0;
    font-size: 0.95rem;
}

.product-image {
    max-width: 150px;
    max-height: 150px;
    object-fit: contain;
    margin-top: 0.5rem;
    border-radius: 4px;
}
</style>
