<template>
    <CatalogHeader :numberOfItems="cart.length" @select="goToCart" />
    <CatalogGrid :items="catalogItems" @select="goToItem" @addToCart="addItemToCart" />
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CatalogGrid from '../../components/CatalogGrid.vue'
import CatalogHeader from '../../components/CatalogHeader.vue';
const cart = reactive([]);
const catalogItems = ref([
    {
        product_id: 'P001',
        sku: 'SKU-001',
        name: 'Industrial Hammer',
        description: 'Durable steel hammer used for heavy-duty work.',
        image_url: '/images/gecko.jpg',
        price: '$19.99'
    },
    {
        product_id: 'P002',
        sku: 'SKU-002',
        name: 'Electric Screwdriver',
        description: 'Rechargeable screwdriver with torque control.',
        image_url: '/images/gecko.jpg',
        price: '$24.50'
    },
    {
        product_id: 'P003',
        sku: 'SKU-003',
        name: 'Precision Wrench Set',
        description: '10-piece set with metric and imperial sizes.',
        image_url: '/images/gecko.jpg',
        price: '$34.95'
    },
    {
        product_id: 'P004',
        sku: 'SKU-004',
        name: 'Heavy-Duty Tape Measure',
        description: '25ft retractable tape with magnetic hook.',
        image_url: '/images/gecko.jpg',
        price: '$9.75'
    },
    {
        product_id: 'P005',
        sku: 'SKU-005',
        name: 'Cordless Drill',
        description: '18V drill with dual-speed settings and LED light.',
        image_url: '/images/gecko.jpg',
        price: '$49.00'
    }
]);
function goToItem() {
    console.log('click go to item')
    //will go to product page
}
function addItemToCart(item) {
    cart.push(item);
    console.log(cart.length);
}
function goToCart(where) {
    console.log('clicked cart')
    //go to cart page
}

</script>