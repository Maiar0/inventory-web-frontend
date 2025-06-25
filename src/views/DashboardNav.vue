<template>
    <NavGrid :items="navItems" @select="goDeeper" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavApi from '../api/NavApi';
import NavGrid from '../components/NavGrid.vue';

const navItems = ref([]);
const route = useRoute();
const router = useRouter();

async function fetchNav() {
    const path = route.path.replace(/^\/dashboard/, '') || '/';
    console.log(path);
    const result = await new NavApi().getNavigation(path); // pass current location
    console.log(result.data)
    navItems.value = Array.isArray(result.data) ? result.data : [result.data];
}

onMounted(fetchNav);
watch(() => route.fullPath, fetchNav); // refetch when path changes

function goDeeper(newPath) {
    router.push(`/dashboard${newPath}`);
}
</script>
