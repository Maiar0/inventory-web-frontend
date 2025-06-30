<template>
    <div class="cart-grid">
        <div v-for="item in items" class="grid-item">
            <h2 @click="$emit('select', item.route)"> {{ item.name + ' : ' + item.product_id }} </h2>
            <img v-if="item.image_url" :src="backend_url + item.image_url" alt="Product Image" class="item-image" />
            <p class="description">{{ item.description }}</p>
            <p class="price">{{ '$' + (item.price).toFixed(2) }}</p>
            <input v-model="item.quantity" type="number" step="1"
                @input="changeQuantity(item.product_id, $event.target.value)" />
            <p class="total">{{ '$' + (item.quantity * item.price).toFixed(2) }}</p>
            <button class="delte" @click="deleteItem(item.product_id)">-</button>
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useCart } from '../../composables/useCart';
const backend_url = import.meta.env.VITE_PUBLIC_URL
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