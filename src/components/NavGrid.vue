<template>
    <div class="grid grid-3 gap-lg">
        <div v-for="item in items" :key="item.name"
            class="card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            @click="$emit('select', item.route)">
            <div class="card-body">
                <h3 class="text-lg font-semibold mb-sm">{{ item.name }}</h3>
                <p class="text-muted text-sm">{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    items: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
/* Component-specific styles only */
.cursor-pointer {
    cursor: pointer;
}

.transition-all {
    transition: all var(--transition-normal);
}

.hover\:shadow-lg:hover {
    box-shadow: var(--shadow-lg);
}

.hover\:-translate-y-1:hover {
    transform: translateY(-0.25rem);
}
</style>
