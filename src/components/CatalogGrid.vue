<template>
  <div class="catalog-grid">
    <div v-for="item in items" :key="item.name" class="grid-item">

      <h2 @click="$emit('select', item.route)"> {{ item.name + ' : ' + item.product_id }} </h2>
      <img v-if="item.image_url" :src="backend_url + item.image_url" alt="Product Image" class="item-image" />
      <p class="description">{{ item.description }}</p>
      <p class="price">{{ '$' + (item.price).toFixed(2) }}</p>
      <div class="purchases">
        <input :value="getQuantity(item.product_id)" type="number" min="1" step="1"
          @input="e => updateQuantity(item.product_id, +e.target.value)" />
        <button @click="addItem(item.product_id, getQuantity(item.product_id))">+</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const backend_url = import.meta.env.VITE_PUBLIC_URL
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
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 20px;
}

.grid-item {
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 15px;
  transition: border-color 0.2s ease, transform 0.2s ease;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-item:hover {
  border-color: #888;
  transform: translateY(-3px);
  cursor: pointer;
}

.item-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  border: 1px solid #333;
}

h2 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: white;
}

.description {
  font-size: 0.95rem;
  color: #ccc;
  margin-bottom: 0.25rem;
}

.price {
  font-weight: bold;
  color: #9acd32;
  margin-bottom: 0.5rem;
}

.purchases {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}

.purchases input[type='number'] {
  width: 60px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #888;
  background-color: #2a2a2a;
  color: white;
}

.purchases button {
  padding: 5px 10px;
  background-color: #5c5;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.purchases button:hover {
  background-color: #4a4;
}
</style>
