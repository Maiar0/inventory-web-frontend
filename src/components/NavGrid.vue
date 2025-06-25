<template>
    <div class="nav-grid">
        <div v-for="item in items" :key="item.name" class="grid-item" @click="$emit('select', item.route)">
            <h2>{{ item.name }}</h2>
            <p>{{ item.description }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({ items: Array });
defineEmits(['select']);
</script>

<style scoped>
.nav-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.grid-item {
    flex: 0 0 auto;
    min-width: 200px;
    padding: 1rem;
    border: 2px solid #444;
    border-radius: 8px;
    background-color: #1e1e1e;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease;
}

.grid-item:hover {
    transform: translateY(-4px);
    border-color: #888;
}

.grid-item h2 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.grid-item p {
    font-size: 0.95rem;
    color: #ccc;
}
</style>
