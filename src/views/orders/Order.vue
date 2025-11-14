<template>
    <div class="page-container">
        <div class="order-section">
            <h2>Order Items</h2>
            <table class="order-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.product_id" class="order-item">
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>${{ item.price.toFixed(2) }}</td>
                        <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                    </tr>
                    <tr class="order-total">
                        <td colspan="3" class="text-right font-semibold">Total Items: {{ items.length }}</td>
                        <td class="font-semibold">${{ total.toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="billing-section">
            <div class="card">
                <div class="card-header">
                    <h2>Billing Information</h2>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="company-name">Company</label>
                                <input type="text" id="company-name" name="company-name" required>
                            </div>
                            <div class="form-group">
                                <label for="division-name">Division</label>
                                <input type="text" id="division-name" name="division-name" required>
                            </div>
                            <div class="form-group">
                                <label for="dept-name">Attention</label>
                                <input type="text" id="dept-name" name="dept-name" required>
                            </div>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                        </div>
                    </form>
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
/* Main container - full width stacked layout */
.page-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
}

/* Order section - top portion */
.order-section {
    width: 100%;
}

.order-section h2 {
    margin-bottom: var(--spacing-md);
}

/* Order table styling */
.order-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--border-light);
    background-color: var(--bg-primary);
}

.order-table thead {
    background-color: var(--bg-secondary);
}

.order-table th {
    padding: var(--spacing-md);
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid var(--border-light);
}

.order-table td {
    padding: var(--spacing-md);
    background-color: var(--bg-primary);
}

.order-item td {
    text-align: left;
}

.order-total {
    background-color: var(--bg-secondary);
    font-weight: 600;
}

.order-total td:first-child {
    text-align: right;
}

/* Billing section - bottom portion */
.billing-section {
    width: 100%;
}

.card {
    width: 100%;
    border: 1px solid var(--border-light);
    background-color: var(--bg-primary);
}

.card-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-light);
    background-color: var(--bg-secondary);
}

.card-header h2 {
    margin: 0;
}

.card-body {
    padding: var(--spacing-lg);
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.form-group label {
    font-weight: 500;
}

.form-group input {
    padding: var(--spacing-sm);
    border: 1px solid var(--border-light);
    border-radius: 4px;
}

.btn-primary {
    margin-top: var(--spacing-md);
}
</style>