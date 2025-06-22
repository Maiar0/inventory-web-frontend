<template>
    <div class="home-container">
        <h1>Home</h1>
        <div class="login-box">
            <h2>Login</h2>
            <form @submit.prevent="handleLogin">
                <input v-model="email" type="email" placeholder="Email" required />
                <input v-model="password" type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../api/supabase';

const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
    console.log('Trying to log in with:', email.value, password.value);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    console.log(data, error);
    if (error) {
        errorMessage.value = error.message;
    } else {
        errorMessage.value = '';
        router.push('/dashboard');
    }
}

</script>

<style scoped>
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: #ffffff;
    text-align: center;
}

.login-box {
    background-color: #222;
    padding: 2rem;
    border-radius: 10px;
    display: inline-block;
}

input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
}

button {
    padding: 0.5rem 1.5rem;
    background-color: darkslateblue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.error {
    margin-top: 1rem;
    color: #ff5c5c;
}
</style>
