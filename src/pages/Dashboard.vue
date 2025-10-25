<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '../composables/useAuth';

const { logout } = useAuth();
const tickets = ref([]);

// ✅ Load from Vue-specific key
const loadTickets = () => {
  const stored = JSON.parse(localStorage.getItem('ticketapp_vue_tickets')) || [];
  tickets.value = stored;
};

onMounted(() => {
  loadTickets();

  // ✅ Listen for other tabs/pages updating localStorage
  window.addEventListener('storage', (e) => {
    if (e.key === 'ticketapp_vue_tickets') loadTickets();
  });
});

// ✅ Computed stats auto-update whenever tickets change
const stats = computed(() => ({
  total: tickets.value.length,
  open: tickets.value.filter((t) => t.status === 'open').length,
  in_progress: tickets.value.filter((t) => t.status === 'in_progress').length,
  closed: tickets.value.filter((t) => t.status === 'closed').length,
}));
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-900 text-white overflow-hidden">
    <Navbar />

    <!-- glowing accents -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
      <div class="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-500 rounded-full blur-3xl opacity-30"></div>
    </div>

    <main class="relative flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
      <!-- Top wave -->
      <svg class="absolute top-0 left-0 w-full" viewBox="0 0 1440 320">
        <path
          fill="#4f46e5"
          fill-opacity="0.4"
          d="M0,64L40,80C80,96,160,128,240,144C320,160,400,160,480,170.7C560,181,640,203,720,192C800,181,880,139,960,138.7C1040,139,1120,181,1200,213.3C1280,245,1360,267,1400,277.3L1440,288V0H0Z"
        />
      </svg>

      <div class="relative z-10 max-w-[1440px] mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-12">Dashboard Overview</h1>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="stat in [
              { label: 'Total Tickets', value: stats.total },
              { label: 'Open', value: stats.open, color: 'text-green-300' },
              { label: 'In Progress', value: stats.in_progress, color: 'text-amber-300' },
              { label: 'Closed', value: stats.closed, color: 'text-gray-300' }
            ]"
            :key="stat.label"
            class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:bg-white/20 transition"
          >
            <h3 class="text-sm uppercase tracking-wide text-white/70">{{ stat.label }}</h3>
            <p class="text-4xl font-bold" :class="stat.color || 'text-white'">{{ stat.value }}</p>
          </div>
        </div>

        <div class="flex justify-center gap-6 mt-16 flex-wrap">
          <RouterLink
            to="/tickets"
            class="bg-white text-indigo-700 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl focus:ring-2 focus:ring-white transition"
          >
            Manage Tickets
          </RouterLink>
          <button
            @click="logout"
            class="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-xl shadow-lg focus:ring-2 focus:ring-white transition"
          >
            Logout
          </button>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>
