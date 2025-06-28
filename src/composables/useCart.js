// composables/useCart.js
import { ref, watch, onMounted } from 'vue';

const cart = ref([]);

export function useCart() {
  onMounted(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        cart.value = JSON.parse(stored);
      } catch {}
    }
  });

  watch(cart, (newVal) => {
    localStorage.setItem('cart', JSON.stringify(newVal));
  }, { deep: true });

  return { cart };
}
