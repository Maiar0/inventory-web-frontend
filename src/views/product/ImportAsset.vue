<template>
    <div class="import-asset-form">
        <section class="section">
            <div class="form-header">
                <h2>Import Asset</h2>
            </div>
            <div class="form-row">
                <label>Asset File:</label>
                <input type="file" @change="handleFileUpload" />
            </div>
            <div class="form-row">
                <label>Asset Name:</label>
                <input v-model="assetName" />
            </div>
        </section>
        <section class="action-buttons">
            <button @click="submitForm">Submit</button>
            <button @click="cancelForm">Cancel</button>
        </section>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import ApiFetch from '../../api/ApiFetch';
const api = new ApiFetch();
const assetName = ref('');
const file = ref(null);

function handleFileUpload(event) {
    file.value = event.target.files[0];
}

async function submitForm() {
    if (!file.value || !assetName.value) {
        alert('Please provide both asset file and name.');
        return;
    }
    const formData = new FormData();
    formData.append('file', file.value);
    formData.append('name', assetName.value);
    try {
        result = await api.fetchFormData('/asset/import', formData);
        alert('Upload successful!');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again.');
    }
}

</script>