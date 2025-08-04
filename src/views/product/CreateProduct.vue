<template>
    <div class="container">
        <div class="card">
            <div class="card-header-invisible">
                <h2>Create Product</h2>
            </div>
            <div class="card-body">
                <div class="grid grid-2 gap-lg">
                    <div class="form-group">
                        <label for="sku">SKU:</label>
                        <input id="sku" v-model="item.sku" />
                    </div>
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input id="name" v-model="item.name" />
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <input id="description" v-model="item.description" />
                    </div>
                    <div class="form-group">
                        <label for="image">Image:</label>
                        <div class="image-search">
                            <input id="image" v-model="item.image_url" @input="filterAssetList"
                                @focus="showDropdown = true" @blur="hideDropdown" placeholder="Search for an image" />
                            <div v-if="showDropdown" class="dropdown">
                                <div v-for="asset in filteredAssets" :key="asset.name" @click="selectAsset(asset)"
                                    class="dropdown-item">
                                    {{ asset.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer-invisible">
                <div class="flex gap-md">
                    <button @click="sumbitForm" class="btn-primary">Save Product</button>
                    <button @click="cancelForm" class="btn-ghost">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useCacheManager } from '../../composables/useCacheManager';
import ApiFetch from '../../api/ApiFetch';
const api = new ApiFetch();

const { getData } = useCacheManager();
const router = useRouter();

const item = ref({
    sku: '',
    name: '',
    description: '',
    image_url: ''
})

const assets = ref([]);
const filteredAssets = ref([]);
const showDropdown = ref(false);

onMounted(() => {
    fetchAssets();
});

async function fetchAssets() {
    getData('assets').then(result => {
        if (result && result.data) {
            assets.value = result.data;
            filteredAssets.value = result.data.slice(0, 10); // Show first 10 by default
        } else {
            console.error('No data found in the response');
        }
    }).catch(error => {
        console.error('Error fetching assets:', error);
    });
}

function filterAssetList() {
    if (!item.value.image_url) {
        filteredAssets.value = assets.value.slice(0, 10);
        return;
    }

    const query = item.value.image_url.toLowerCase();
    const filtered = assets.value.filter(asset =>
        asset.name.toLowerCase().includes(query)
    );
    filteredAssets.value = filtered.slice(0, 10);
}

function selectAsset(asset) {
    item.value.image_url = asset.name;
    showDropdown.value = false;
}

function hideDropdown() {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200); // Let click register before hiding
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
/* Component-specific styles only */
.form-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
}

.card-header-invisible {
    padding: var(--spacing-lg);
    border-bottom: none;
    background-color: transparent;
}

.card-footer-invisible {
    padding: var(--spacing-lg);
    border-top: none;
    background-color: transparent;
}

.image-search {
    position: relative;
}

.dropdown {
    position: absolute;
    background: var(--white);
    color: var(--text-primary);
    border: 1px solid var(--border-medium);
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    z-index: var(--z-dropdown);
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
}

.dropdown-item {
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    transition: background-color var(--transition-fast);
}

.dropdown-item:hover {
    background-color: var(--gray-100);
}

/* Dark mode support for dropdown */
@media (prefers-color-scheme: dark) {
    .dropdown {
        background: var(--bg-primary);
        color: var(--text-primary);
        border-color: var(--border-medium);
    }

    .dropdown-item:hover {
        background-color: var(--gray-800);
    }
}
</style>