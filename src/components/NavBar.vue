<template>
  <nav class="navbar">
    <h1 class="navbar_title">
      <img src="/medeving-white.svg" alt="Medeving Logo" width="48" height="48"
        style="vertical-align: middle; margin-right: -0.5em;" />
      DwardDevs.com
    </h1>
    <div class="navbar_buttons">
      <button @click="goHome">Home</button>
      <button @click="goAbout">About</button>
      <button @click="testMe">Test</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => {
  router.push('/home');
}
const goAbout = () => {
  router.push('/about');
}
//for testing vues
const testMe = () => {
  router.push('/test');
}
</script>

<style scoped>
.navbar {
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
  width: 100%;
}

.navbar_buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button {
  background-color: darkslategrey;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}

.navbar_title {
  width: 25%;
  font-size: 2.0em;
  text-align: left;
  padding-left: 1rem;
  margin: 0;
}
</style>
