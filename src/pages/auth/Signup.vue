<template>
  <div class="flex flex-col min-h-screen bg-white">
    <Navbar />

    <main class="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-16 md:py-0">
      <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md transform transition-all">
        <h2 class="text-3xl font-bold text-center mb-6 text-blue-700">
          Create Account
        </h2>

        <form @submit.prevent="handleSignup" class="space-y-6">
          <div class="mb-4">
            <label class="block mb-1 font-medium text-gray-700">Name</label>
            <input
              v-model="name"
              type="text"
              class="w-full border rounded-lg p-3 focus:outline-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="John Doe"
            />
            <div v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</div>
          </div>

          <div class="mb-4">
            <label class="block mb-1 font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              class="w-full border rounded-lg p-3 focus:outline-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="you@example.com"
            />
            <div v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</div>
          </div>

          <div class="mb-4">
            <label class="block mb-1 font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              class="w-full border rounded-lg p-3 focus:outline-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="••••••••"
            />
            <div v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</div>
          </div>

          <div v-if="formError" class="text-red-500 text-sm text-center mb-4">{{ formError }}</div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>

          <p class="text-center text-sm mt-4 text-gray-600">
            Already have an account?
            <RouterLink to="/auth/login" class="text-blue-600 hover:underline">Login</RouterLink>
          </p>
        </form>
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

const { signup } = useAuth();
const name = ref('');
const email = ref('');
const password = ref('');
const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const formError = ref('');

const validateEmail = (val) => /.+@.+\..+/.test(val);

const handleSignup = () => {
  nameError.value = '';
  emailError.value = '';
  passwordError.value = '';
  formError.value = '';

  let valid = true;
  if (!name.value.trim()) {
    nameError.value = 'Name is required';
    valid = false;
  }
  if (!email.value.trim()) {
    emailError.value = 'Email is required';
    valid = false;
  } else if (!validateEmail(email.value)) {
    emailError.value = 'Invalid email address';
    valid = false;
  }
  if (!password.value.trim()) {
    passwordError.value = 'Password is required';
    valid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
    valid = false;
  }

  if (!valid) return;

  try {
    signup(name.value, email.value, password.value);
  } catch (e) {
    formError.value = 'Signup failed. Please try again.';
  }
};
</script>