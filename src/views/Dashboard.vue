<template>
    <div class="dashboard-container">
        <h1>Dashboard</h1>
        <div class="grid">
            <div v-for="item in navItems" :key="item.name" class="grid-item" @click="goTo(item.route)">
                <h2>{{ item.name }}</h2>
                <p>{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navItems = ref([]);

const goTo = (route) => {
    router.push(route);
};
</script>

<style scoped>
.dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: #ffffff;
}

h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
}

.grid-item {
    background-color: #2c2c2c;
    padding: 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.grid-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.grid-item h2 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
}

.grid-item p {
    font-size: 0.95rem;
    color: #ccc;
}
</style>
