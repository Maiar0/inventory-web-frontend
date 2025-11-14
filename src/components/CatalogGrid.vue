<template>
  <div class="grid grid-4 gap-lg">
    <div v-for="item in items" :key="item.name" class="card flex flex-col">
      <div class="card-body flex-1">
        <div @click="$emit('select', item.route)" class="product-title">
          <h3 class="text-lg font-semibold title-spacing">{{ item.name }}</h3>
          <p class="text-muted text-xs">ID: {{ item.product_id }}</p>
        </div>
        <img v-if="item.image_url" :src="backend_url + item.image_url" alt="Product Image" class="product-image" />
        <p class="text-muted text-sm mb-sm">{{ item.description }}</p>
        <p class="text-success font-bold text-lg mb-md">{{ '$' + (item.price).toFixed(2) }}</p>
      </div>
      <div class="p-md border-t">
        <div class="flex items-center gap-sm">
          <input :value="getQuantity(item.product_id)" type="number" min="1" step="1" class="quantity-input"
            @input="e => updateQuantity(item.product_id, +e.target.value)" />
          <button @click="addItem(item.product_id, getQuantity(item.product_id))" class="btn-success">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const backend_url = import.meta.env.VITE_PUBLIC_URL + '/images/';
const quantities = ref({});

const emit = defineEmits(['select', 'addToCart']);

defineProps({
  items: {
    type: Array,
    required: true
  }
});

function addItem(id) {
  const quantity = quantities.value[id] || 1;
  emit('addToCart', { id, quantity });
}

function getQuantity(id) {
  return quantities.value[id] ?? 1;
}

function updateQuantity(id, val) {
  quantities.value[id] = val;
}
</script>

<style scoped>
/* Component-specific styles */
.product-title {
  cursor: pointer;
}

.product-title:hover h3 {
  color: var(--primary-color);
}

.product-image {
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
  border: 1px solid var(--border-light);
}

.quantity-input {
  width: 4rem;
}

.title-spacing {
  margin-bottom: var(--spacing-xs);
}

.border-t {
  border-top: 1px solid var(--border-light);
}
</style>
