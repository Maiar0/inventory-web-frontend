<template>
    <div>
        <DashboardHeader :breadcrumb="breadcrumb" />
        <router-view />
    </div>
</template>
<script setup>
import DashboardHeader from '../components/DashboardHeader.vue'; // Adjust path as needed
import { ref } from 'vue';

// This can be dynamically computed based on route if needed
const breadcrumb = ref(['Dashboard']);
</script>