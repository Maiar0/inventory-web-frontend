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

  function addItem(id, quantity) {
    const index = cart.value.findIndex(item => item.product_id === id);
    if (index !== -1) {
      cart.value[index].quantity += quantity;
    } else {
      cart.value.push({ product_id: id, quantity });
    }
  }

  function clearCart() {
    cart.value = [];
  }
  function deleteItem(id) {
    const index = cart.value.findIndex(item => item.product_id === id);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  }
  function changeQuantity(id, quantity){
    if (quantity < 1) {
      return;
    }
    const index = cart.value.findIndex(item => item.product_id === id );
    if(index !== -1){
      cart.value[index].quantity = quantity;
    }
  }

  return { cart, addItem, clearCart, deleteItem, changeQuantity };
}
