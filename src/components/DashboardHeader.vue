<template>
    <header class="dashboard-header">
        <div class="breadcrumb">
            <span v-for="(crumb, index) in breadcrumb" :key="index">
                {{ crumb }} <span v-if="index < breadcrumb.length - 1">/</span>
            </span>
        </div>
        <div class="user-info">
            Logged in as: <strong>{{ username }}</strong>
        </div>
    </header>
</template>

<script setup>
defineProps({
    breadcrumb: {
        type: Array,
        required: true
    }
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
    font-size: 0.9rem;
}

.user-info {
    font-size: 0.9rem;
}
</style>
