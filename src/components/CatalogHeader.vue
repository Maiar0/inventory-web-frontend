<template>
    <header class="catalog-header">
        <div class="user-info"><strong>{{ username }}</strong></div>
        <div class="cart-wrapper">
            <img :src="CartIcon" alt="Cart" class="cart-icon" @click="$emit('select', '/cart')" />
            <span v-if="numberOfItems > 0" class="cart-badge">{{ numberOfItems }}</span>
        </div>
    </header>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
import CartIcon from '../assets/cart-white.svg'
const username = localStorage.getItem('username');
const emit = defineEmits(['select'])
const props = defineProps({
    numberOfItems: {
        type: Number,
        default: 0
    }
});
</script>
<style scoped>
.cart-wrapper {
    position: relative;
    display: inline-block;
}

.cart-icon {
    width: 32px;
    height: 32px;
}

.cart-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: red;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 1;
    min-width: 20px;
    text-align: center;
}

.cart-icon:hover {
    border-color: #888;
    transform: translateY(-3px);
    cursor: pointer;
}

.catalog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}
</style>