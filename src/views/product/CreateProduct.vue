<template>
    <div class="create-product-form">
        <section class="section">
            <h2>Create Product</h2>
            <div class="form-grid">
                <div class="form-row">
                    <label>SKU:</label>
                    <input v-model="item.sku" />
                </div>
                <div class="form-row">
                    <label>Name:</label>
                    <input v-model="item.name" />
                </div>
                <div class="form-row">
                    <label>Description:</label>
                    <input v-model="item.description" />
                </div>
                <div class="form-row">
                    <label>Image:</label>
                    <input list="asset-options" v-model="item.image_url" />
                    <datalist id="asset-options">
                        <option v-for="asset in assets" :key="asset.name" :value="asset.name" />
                    </datalist>
                </div>
            </div>
        </section>
        <div class="form-actions">
            <button @click="sumbitForm">Save Invoice</button>
            <button @click="cancelForm">Cancel</button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import ApiFetch from '../../api/ApiFetch';
import { useRouter } from 'vue-router'
const router = useRouter();
const api = new ApiFetch();
const item = ref({
    sku: '',
    name: '',
    description: '',
    image_url: ''
})
const assets = ref([]);
onMounted(() => {
    fetchAssets();
});
async function fetchAssets() {
    try {
        const result = await api.fetchAssets();
        if (result && result.data) {
            assets.value = result.data;
        } else {
            console.error('No data found in the response');
        }
    } catch (error) {
        console.error('Error fetching assets:', error);
    }
}
function sumbitForm() {
    console.log('item:', item.value);
    if (!item.value.sku || !item.value.name || !item.value.description || !item.value.image_url) {
        alert('Please fill in all fields');
        return;
    }
    api.fetch('/product/create', {
        method: 'POST',
        body: JSON.stringify(item.value),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('response:', response);
        if (response) {
            alert('Product created successfully');
        }
    }).catch(error => {
        console.error('Error creating product:', error);
        alert('An error occurred while creating the product');
    });
}
function cancelForm() {
    router.push('/dashboard');
}
</script>
<style scoped>
.invoice-form {
    max-width: 100%;
    margin: auto;
    padding: 20px;
    font-family: sans-serif;
}

.section {
    margin-bottom: 30px;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 6px;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 10px;
}

.form-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-row label {
    color: white;
    width: 40%;
    font-weight: bold;
}

.form-row input {
    width: 60%;
}

h2 {
    color: white;
}
</style>