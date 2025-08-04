<template>
    <div class="container">
        <div v-if="items.length > 0" class="grid grid-4 gap-lg">
            <div v-for="item in items" :key="item.product_id" class="card flex flex-col">
                <div class="card-body flex-1">
                    <div @click="$emit('select', item.route)" class="cursor-pointer hover:text-primary mb-sm">
                        <h3 class="text-lg font-semibold">{{ item.name }}</h3>
                        <p class="text-muted text-xs">ID: {{ item.product_id }}</p>
                    </div>
                    <img v-if="item.image_url" :src="backend_url + item.image_url" alt="Product Image"
                        class="product-image" />
                    <p class="text-muted text-sm mb-sm">{{ item.description }}</p>
                    <p class="text-success font-bold text-lg mb-sm">{{ '$' + (item.price).toFixed(2) }}</p>

                    <div class="flex items-center gap-sm mb-sm">
                        <label class="text-sm">Qty:</label>
                        <input v-model="item.quantity" type="number" step="1"
                            @input="changeQuantity(item.product_id, $event.target.value)" min="1"
                            class="quantity-input" />
                    </div>

                    <p class="text-lg font-bold mb-md">Total: {{ '$' + (item.quantity * item.price).toFixed(2) }}</p>
                </div>
                <div class="card-footer-invisible">
                    <button class="btn-error w-full" @click="deleteItem(item.product_id)">Remove from Cart</button>
                </div>
            </div>
        </div>

        <div v-else class="text-center p-lg">
            <h2 class="text-muted">Your cart is empty!</h2>
            <p class="text-muted">Add some products to get started.</p>
        </div>

        <div v-if="items.length > 0" class="card mt-lg">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-bold">
                        Total: {{'$' + items.reduce((total, item) => total + (item.quantity * item.price),
                            0).toFixed(2)}}
                    </h2>
                    <button @click="checkOut()" class="btn-primary">Checkout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCart } from '../../composables/useCart';

const backend_url = import.meta.env.VITE_PUBLIC_URL;
const { cart, deleteItem, changeQuantity } = useCart();

const items = computed(() => {
    return cart.value.map(({ product_id, quantity }) => {
        const baseItem = catalogItems.value.find(item => item.product_id === product_id);
        if (baseItem) {
            return {
                ...baseItem,
                quantity
            };
        }
        return null;
    }).filter(Boolean);
});

function checkOut() {
    // Implement checkout logic here
    console.log('Checkout with items:', items.value);
}

const catalogItems = ref([
    {
        product_id: 'P001',
        sku: 'SKU-001',
        name: 'Industrial Hammer',
        description: 'Durable steel hammer used for heavy-duty work.',
        image_url: '/images/gecko.jpg',
        price: 19.99
    },
    {
        product_id: 'P002',
        sku: 'SKU-002',
        name: 'Electric Screwdriver',
        description: 'Rechargeable screwdriver with torque control.',
        image_url: '/images/gecko.jpg',
        price: 24.50
    },
    {
        product_id: 'P003',
        sku: 'SKU-003',
        name: 'Precision Wrench Set',
        description: '10-piece set with metric and imperial sizes.',
        image_url: '/images/gecko.jpg',
        price: 34.95
    },
    {
        product_id: 'P004',
        sku: 'SKU-004',
        name: 'Heavy-Duty Tape Measure',
        description: '25ft retractable tape with magnetic hook.',
        image_url: '/images/gecko.jpg',
        price: 9.75
    },
    {
        product_id: 'P005',
        sku: 'SKU-005',
        name: 'Cordless Drill',
        description: '18V drill with dual-speed settings and LED light.',
        image_url: '/images/gecko.jpg',
        price: 49.00
    }
]);

function getItem(id) {
    //we will fetch from db either all items or paticular item to parse
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

.product-image {
    width: 100%;
    height: 8rem;
    object-fit: cover;
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-sm);
}

.quantity-input {
    width: 4rem;
}

.card-footer-invisible {
    padding: var(--spacing-md);
    border-top: none;
    background-color: transparent;
}

.mt-lg {
    margin-top: var(--spacing-lg);
}
</style>