<template>
    <div class="container">
        <div class="grid grid-2 gap-lg">
            <div class="card">
                <div class="card-header">
                    <h2>Shipping Information</h2>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="address">Address:</label>
                            <input type="text" id="address" name="address" required>
                        </div>
                        <div class="form-group">
                            <label for="city">City:</label>
                            <input type="text" id="city" name="city" required>
                        </div>
                        <div class="form-group">
                            <label for="state">State:</label>
                            <input type="text" id="state" name="state" required>
                        </div>
                        <div class="form-group">
                            <label for="zip">Zip Code:</label>
                            <input type="text" id="zip" name="zip" required>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2>Billing Information</h2>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="card-name">Cardholder Name:</label>
                            <input type="text" id="card-name" name="card-name" required>
                        </div>
                        <div class="form-group">
                            <label for="card-number">Card Number:</label>
                            <input type="text" id="card-number" name="card-number" required>
                        </div>
                        <div class="form-group">
                            <label for="expiry">Expiry Date:</label>
                            <input type="text" id="expiry" name="expiry" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV:</label>
                            <input type="text" id="cvv" name="cvv" required>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="grid grid-2 gap-lg mt-lg">
            <div class="card">
                <div class="card-header">
                    <h2>Order Items</h2>
                </div>
                <div class="card-body">
                    <ul class="order-items">
                        <li v-for="item in items" :key="item.product_id" class="order-item">
                            {{ item.name }} - {{ item.quantity }} x ${{ item.price.toFixed(2) }}
                        </li>
                    </ul>
                    <p class="text-lg font-semibold mt-md">Total: ${{ total.toFixed(2) }}</p>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2>Order Summary</h2>
                </div>
                <div class="card-body">
                    <p>Total Items: {{ items.length }}</p>
                    <p class="text-lg font-semibold">Total Price: ${{ total.toFixed(2) }}</p>
                    <button @click="completePurchase" class="btn-primary mt-md">Order</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
const items = ref([
    {
        product_id: 'P001',
        sku: 'SKU-001',
        name: 'Industrial Hammer',
        description: 'Durable steel hammer used for heavy-duty work.',
        image_url: '/images/gecko.jpg',
        price: 19.99,
        quantity: 1
    },
    {
        product_id: 'P002',
        sku: 'SKU-002',
        name: 'Electric Screwdriver',
        description: 'Rechargeable screwdriver with torque control.',
        image_url: '/images/gecko.jpg',
        price: 24.50,
        quantity: 2
    },
    {
        product_id: 'P003',
        sku: 'SKU-003',
        name: 'Precision Wrench Set',
        description: '10-piece set with metric and imperial sizes.',
        image_url: '/images/gecko.jpg',
        price: 34.95,
        quantity: 1
    },
    {
        product_id: 'P004',
        sku: 'SKU-004',
        name: 'Heavy-Duty Tape Measure',
        description: '25ft retractable tape with magnetic hook.',
        image_url: '/images/gecko.jpg',
        price: 9.75,
        quantity: 3
    },
    {
        product_id: 'P005',
        sku: 'SKU-005',
        name: 'Cordless Drill',
        description: '18V drill with dual-speed settings and LED light.',
        image_url: '/images/gecko.jpg',
        price: 49.00,
        quantity: 1
    }
]);

const total = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});
function populateItems() {
    //fetch inventory from cart and request backend information to populate items
}
function completePurchase() {
    // Implement purchase logic here
    console.log('Purchase completed with items:', items.value);
}
</script>
<style scoped>
/* Component-specific styles only */
.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.card-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-light);
    background-color: var(--bg-secondary);
}

.order-items {
    list-style-type: none;
    padding: 0;
}

.order-item {
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--border-light);
}

.order-item:last-child {
    border-bottom: none;
}
</style>