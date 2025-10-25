<template>
  <nav class="relative z-50 bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
    <div class="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
      <RouterLink
        :to="isLoggedIn ? '/dashboard' : '/'"
        class="text-2xl font-extrabold tracking-wide focus:ring-2 focus:ring-white rounded"
      >
        TicketApp
      </RouterLink>

      <!-- Desktop Menu -->
      <div class="hidden md:flex gap-6 items-center">
        <template v-if="isLoggedIn">
          <RouterLink
            to="/dashboard"
            class="hover:text-blue-200 focus:ring-2 focus:ring-white rounded px-2"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            to="/tickets"
            class="hover:text-blue-200 focus:ring-2 focus:ring-white rounded px-2"
          >
            Tickets
          </RouterLink>
          <button
            @click="logout"
            class="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-lg transition focus:ring-2 focus:ring-white"
          >
            Logout
          </button>
        </template>

        <template v-else>
          <RouterLink
            to="/auth/login"
            class="hover:text-blue-200 focus:ring-2 focus:ring-white rounded px-2"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/auth/signup"
            class="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-lg transition focus:ring-2 focus:ring-white"
          >
            Get Started
          </RouterLink>
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="md:hidden focus:ring-2 focus:ring-white rounded p-1"
        aria-label="Toggle menu"
      >
        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Dropdown -->
    <div v-if="isMenuOpen" class="md:hidden flex flex-col bg-indigo-800/90 backdrop-blur-sm text-white px-4 pb-4">
      <template v-if="isLoggedIn">
        <RouterLink
          to="/dashboard"
          @click="closeMenu"
          class="py-2 hover:text-blue-200 focus:ring-2 focus:ring-white rounded"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/tickets"
          @click="closeMenu"
          class="py-2 hover:text-blue-200 focus:ring-2 focus:ring-white rounded"
        >
          Tickets
        </RouterLink>
        <button
          @click="handleLogout"
          class="py-2 text-left hover:text-blue-200 focus:ring-2 focus:ring-white rounded"
        >
          Logout
        </button>
      </template>

      <template v-else>
        <RouterLink
          to="/auth/login"
          @click="closeMenu"
          class="py-2 hover:text-blue-200 focus:ring-2 focus:ring-white rounded"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/auth/signup"
          @click="closeMenu"
          class="py-2 hover:text-blue-200 focus:ring-2 focus:ring-white rounded"
        >
          Get Started
        </RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const { isLoggedIn, logout } = useAuth();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleLogout = () => {
  closeMenu();
  logout();
};
</script>
