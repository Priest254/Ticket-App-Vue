<template>
  <div class="flex flex-col min-h-screen bg-white">
    <Navbar />

    <main class="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-16 md:py-0">
      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md transform transition-all">
        <h2 class="text-3xl font-bold text-center mb-6 text-blue-700">Login</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="mb-4">
            <label class="block mb-1 font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full border rounded-lg p-3 focus:outline-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="you@example.com"
            />
          </div>

          <div class="mb-4">
            <label class="block mb-1 font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full border rounded-lg p-3 focus:outline-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="text-red-500 text-sm text-center mb-4">{{ error }}</div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p class="text-center text-sm mt-6 text-gray-600">
          Don't have an account?
          <RouterLink to="/auth/signup" class="text-blue-600 hover:underline">Sign up</RouterLink>
        </p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

const { login } = useAuth();
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = () => {
  error.value = '';
  const success = login(email.value, password.value);
  if (!success) {
    error.value = 'Invalid credentials';
  }
};
</script>