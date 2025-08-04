<template>
    <div class="container">
        <div class="mb-lg">
            <input type="text" v-model="searchQuery" placeholder="Search products..."
                class="w-full max-w-md mx-auto block" />
        </div>

        <div class="grid grid-4 gap-lg">
            <div v-for="product in filteredProducts" :key="product.sku" class="card text-center">
                <div class="card-body">
                    <div @click="openProduct(product)" class="cursor-pointer hover:text-primary mb-sm">
                        <h3 class="text-lg font-semibold">{{ product.name }}</h3>
                        <p class="text-muted text-sm">ID: {{ product.product_id }}</p>
                    </div>
                    <p class="text-sm mb-sm"><strong>SKU:</strong> {{ product.sku }}</p>
                    <p class="text-muted text-sm mb-md">{{ product.description }}</p>
                    <a v-if="product.image_url" :href="backend_url + product.image_url" target="_blank"
                        rel="noopener noreferrer">
                        <img :src="backend_url + product.image_url" alt="Product Image" class="product-image" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useCacheManager } from '../../composables/useCacheManager';

const { getData } = useCacheManager();
const backend_url = import.meta.env.VITE_PUBLIC_URL + "/images/";
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
    getData('products').then(result => {
        if (result && result.data) {
            products.value = result.data;
        } else {
            console.error('No data found in the response');
        }
    }).catch(error => {
        console.error('Error fetching products:', error);
    });
}

function openProduct(product) {
    // Add your product opening logic here
    console.log('Opening product:', product);
}
</script>

<style scoped>
/* Component-specific styles only */
.cursor-pointer {
    cursor: pointer;
}

.hover\:text-primary:hover {
    color: var(--primary-color);
}

.max-w-md {
    max-width: 28rem;
}

.product-image {
    width: 100%;
    height: 8rem;
    object-fit: cover;
    object-position: center;
    border-radius: var(--radius-md);
    display: block;
    margin: 0 auto;
}
</style>
