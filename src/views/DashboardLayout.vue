<template>
    <div>
        <DashboardHeader />
        <router-view />
    </div>
</template>
<script setup>
import DashboardHeader from '../components/DashboardHeader.vue'; // Adjust path as needed
import { ref } from 'vue';

</script>