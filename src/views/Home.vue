<template>
    <div class="container">
        <div class="flex flex-col items-center justify-center min-h-screen">
            <h1>Home</h1>
            <div class="card p-lg" style="max-width: 400px; width: 100%;">
                <h2 class="text-center">Login</h2>
                <form @submit.prevent="handleLogin" class="flex flex-col gap-md">
                    <div>
                        <label for="email">Email</label>
                        <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input id="password" v-model="password" type="password" placeholder="Enter your password"
                            required />
                    </div>
                    <button type="submit" class="btn-primary">Login</button>
                </form>
                <p v-if="errorMessage" class="text-error text-center m-md">{{ errorMessage }}</p>
            </div>
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
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    })

    if (error) {
        errorMessage.value = error.message;
    } else {
        errorMessage.value = '';
        localStorage.setItem('username', email.value);
        router.push('/dashboard');
    }
}
</script>

<style scoped>
/* Component-specific styles only */
</style>
