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
                    <input type="file" @change="handleFileUpload" accept="image/*" />
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
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();
const productIds = ref([]);
const item = reactive({
    sku: '',
    name: '',
    description: '',
    image: ''
})
const selectedFile = ref(null);
function handleFileUpload(e) {
    selectedFile.value = e.target.files[0];
}
function sumbitForm() {
    let uploadImageUrl = '';
    //check image for errors 
    if (selectedFile.value) {
        const formData = new FormData();
        formData.append('image', selectedFile.value);
        /*const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        uploadedImageUrl = data.imageUrl; 
        */
    }
    /*
    //if(uploadImageUrl !== ''){error}
    item.image = uploadedImageUrl; // set image URL only after upload

    // Now you can send `item` in your API call
    await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
    */
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