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
  <div
    class="flex flex-col min-h-screen bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-900 text-white overflow-hidden"
  >
    <Navbar />

    <main
      class="relative flex-grow flex flex-col items-center justify-center text-center px-4 py-20"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-12">Dashboard Overview</h1>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:bg-white/20 transition"
        >
          <h3 class="text-sm uppercase tracking-wide text-white/70">
            Total Tickets
          </h3>
          <p class="text-4xl font-bold text-white">{{ stats.total }}</p>
        </div>

        <div
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:bg-white/20 transition"
        >
          <h3 class="text-sm uppercase tracking-wide text-white/70">Open</h3>
          <p class="text-4xl font-bold text-green-300">{{ stats.open }}</p>
        </div>

        <div
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:bg-white/20 transition"
        >
          <h3 class="text-sm uppercase tracking-wide text-white/70">
            In Progress
          </h3>
          <p class="text-4xl font-bold text-amber-300">{{ stats.in_progress }}</p>
        </div>

        <div
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:bg-white/20 transition"
        >
          <h3 class="text-sm uppercase tracking-wide text-white/70">Closed</h3>
          <p class="text-4xl font-bold text-gray-300">{{ stats.closed }}</p>
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
    </main>

    <Footer />
  </div>
</template>
