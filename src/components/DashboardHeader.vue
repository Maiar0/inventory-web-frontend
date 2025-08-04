<template>
    <header class="nav">
        <div class="nav-container">
            <nav class="flex gap-sm items-center">
                <span v-for="(item, i) in breadcrumb" :key="i" class="flex items-center">
                    <span class="text-muted">{{ item }}</span>
                    <span v-if="i < breadcrumb.length - 1" class="text-muted mx-sm">/</span>
                </span>
            </nav>
            <div class="text-sm text-muted">
                Logged in as: <strong class="text-primary">{{ username }}</strong>
            </div>
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
/* Component-specific styles only */
.mx-sm {
    margin-left: var(--spacing-sm);
    margin-right: var(--spacing-sm);
}
</style>
