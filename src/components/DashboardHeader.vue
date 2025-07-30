<template>
    <header class="dashboard-header">
        <ul class="breadcrumb">
            <li v-for="(item, i) in breadcrumb" :key="i">
                {{ item }}
                <span v-if="i < breadcrumb.length - 1"> / </span>
            </li>
        </ul>
        <div class="user-info">
            Logged in as: <strong>{{ username }}</strong>
        </div>
    </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();

const breadcrumb = computed(() => {
    return route.path.split('/').filter(Boolean).map(segment => segment.charAt(0).toUpperCase() + segment.slice(1));
});

const username = localStorage.getItem('username');
</script>

<style scoped>
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #1f1f1f;
    color: white;
    border-bottom: 1px solid #333;
}

.breadcrumb {
    display: flex;
    /* Apply here */
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

.user-info {
    font-size: 0.9rem;
}

.breadcrumb li {
    display: flex;
    align-items: center;
}
</style>
