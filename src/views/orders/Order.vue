<template>
    <div class="Order">
        <div class="ship">
            <h2>Shipping Information</h2>
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required>

                <label for="city">City:</label>
                <input type="text" id="city" name="city" required>

                <label for="state">State:</label>
                <input type="text" id="state" name="state" required>

                <label for="zip">Zip Code:</label>
                <input type="text" id="zip" name="zip" required>

                <button type="submit">Submit</button>
            </form>
        </div>
        <div class="bill">
            <h2>Billing Information</h2>
            <form>
                <label for="card-name">Cardholder Name:</label>
                <input type="text" id="card-name" name="card-name" required>

                <label for="card-number">Card Number:</label>
                <input type="text" id="card-number" name="card-number" required>

                <label for="expiry">Expiry Date:</label>
                <input type="text" id="expiry" name="expiry" required>

                <label for="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" required>

                <button type="submit">Pay Now</button>
            </form>
        </div>
        <div class="items">
            <h2>Order Items</h2>
            <ul>
                <li v-for="item in items" :key="item.product_id">
                    {{ item.name }} - {{ item.quantity }} x ${{ item.price.toFixed(2) }}
                </li>
            </ul>
            <p>Total: ${{ total.toFixed(2) }}</p>
        </div>
        <div class="summary">
            <h2>Order Summary</h2>
            <p>Total Items: {{ items.length }}</p>
            <p>Total Price: ${{ total.toFixed(2) }}</p>
            <button @click="completePurchase">Order</button>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
const total = ref(0);
const items = ref([
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
function populateItems() {
    //fetch inventory from cart and request backend information to populate items
}
function completePurchase() {
    // Implement purchase logic here
    console.log('Purchase completed with items:', items.value);
}
</script>
<style scoped>
.Order {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    font-family: Arial, sans-serif;
    background-color: black;
}

.Order>div {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

form {
    display: flex;
    flex-direction: column;
}

form label {
    margin-top: 1rem;
    font-weight: bold;
    color: #333;
}

form input {
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

form button,
.summary button {
    margin-top: 1.5rem;
    padding: 0.75rem;
    border: none;
    background-color: #007BFF;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

form button:hover,
.summary button:hover {
    background-color: #0056b3;
}

.items ul {
    list-style-type: none;
    padding: 0;
}

.items li {
    color: black;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
}

h2 {
    margin-bottom: 1rem;
    color: #444;
}

.summary p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #555;
}
</style>