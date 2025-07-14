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
            <div v-if="previewUrl">
                <h4>Preview:</h4>
                <img :src="previewUrl" alt="Preview" style="max-width: 300px; border: 1px solid #ccc;" />
            </div>
            <div class="form-row">
                <label>Uploader Name:</label>
                <input v-model="assetName" />
            </div>
            <div v-if="assetError" class="error-message">
                {{ assetError }}
            </div>
            <div class="info">
                <label>INFO: Choose an asset that is, 1000px in width, and between 300px-1000px in height</label>
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
const previewUrl = ref('');
const assetError = ref('');

function handleFileUpload(event) {
    assetError.value = '';
    previewUrl.value = '';
    const selected = event.target.files[0];
    if (!selected || !selected.type.startsWith('image/')) {
        assetError.value = 'Please upload a valid image.';
        return;
    }

    // Check file size (2MB max)
    const maxSizeBytes = 2 * 1024 * 1024;
    if (selected.size > maxSizeBytes) {
        assetError.value = 'Image must be smaller than 2MB.';
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            // Check dimensions
            if (img.width !== 1000) {
                assetError.value = 'Image must be 1000px in wdith.';
                return;
            }

            if (img.height < 300 || img.height > 1000) {
                assetError.value = 'Image must be between 300px and 1000px in height.';
                return;
            }

            // Passed validation
            file.value = selected;
            previewUrl.value = reader.result;
        };
        img.onerror = () => {
            assetError.value = 'Failed to read image file.';
        };
        img.src = reader.result;
    };

    reader.readAsDataURL(selected);
}

async function submitForm() {
    if (!file.value || !assetName.value) {
        alert('Please provide both asset file and name.');
        return;
    }
    const formData = new FormData();
    formData.append('asset', file.value);
    formData.append('name', assetName.value);
    try {
        const result = await api.fetchFormData('/asset/create', formData);
        alert('Upload successful!');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again.');
    }
}

</script>
<style scoped>
.import-asset-form {
    max-width: 500px;
    margin: 2rem auto;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: sans-serif;
}

.image-preview img {
    max-width: 100%;
    max-height: 200px;
    object-fit: contain;
    border-radius: 4px;
}

.form-header h2 {
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.form-row label {
    font-weight: bold;
}

.form-row input[type="file"],
.form-row input[type="text"],
.form-row input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #aaa;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1rem;
}

.action-buttons button {
    padding: 0.5rem 1.25rem;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #4285f4;
    color: white;
    transition: background-color 0.2s ease;
}

.error-message {
    color: red;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

.action-buttons button:hover {
    background-color: #3367d6;
}

.action-buttons button:last-child {
    background-color: #888;
}

.action-buttons button:last-child:hover {
    background-color: #666;
}
</style>
