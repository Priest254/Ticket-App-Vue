<template>
  <div
    class="flex flex-col min-h-screen bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-900 text-white overflow-hidden"
  >
    <Navbar />

    <!-- glowing background accents -->
    <div class="absolute inset-0 -z-10">
      <div
        class="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-500 rounded-full blur-3xl opacity-30"
      ></div>
    </div>

    <main class="flex-grow py-16 px-6 max-w-[1440px] mx-auto">
      <h1 class="text-4xl font-bold text-center mb-12">Ticket Management</h1>

      <div class="grid lg:grid-cols-2 gap-10">
        <!-- FORM -->
        <section
          class="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
        >
          <h2 class="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span v-if="editMode">✏️ Edit Ticket</span>
            <span v-else>➕ Create Ticket</span>
          </h2>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block mb-1 text-sm">Title *</label>
              <input
                v-model="form.title"
                type="text"
                class="w-full p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ticket title"
              />
              <div v-if="titleError" class="text-red-400 text-sm mt-1">{{ titleError }}</div>
            </div>

            <div>
              <label class="block mb-1 text-sm">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Optional details..."
              ></textarea>
            </div>

            <div>
              <label class="block mb-1 text-sm">Status *</label>
              <select
                v-model="form.status"
                class="w-full p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div class="flex gap-3">
              <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                {{ editMode ? "Update" : "Add Ticket" }}
              </button>

              <button
                v-if="editMode"
                @click="resetForm"
                type="button"
                class="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>

        <!-- TICKETS LIST -->
        <section>
          <div
            v-if="tickets.length === 0"
            class="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center text-white/70"
          >
            No tickets yet. Create one to get started!
          </div>

          <div v-else class="grid sm:grid-cols-2 gap-6">
            <div
              v-for="t in tickets"
              :key="t.id"
              class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-md hover:bg-white/20 transition backdrop-blur-xl"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold text-lg">{{ t.title }}</h3>
                <span
                  class="px-3 py-1 text-xs border rounded-full"
                  :class="badgeClass(t.status)"
                >
                  {{ t.status.replace('_', ' ') }}
                </span>
              </div>

              <p v-if="t.description" class="text-sm text-white/80 mb-3">
                {{ t.description }}
              </p>

              <div
                class="flex justify-between items-center text-sm text-white/60"
              >
                <span>{{ t.createdAt }}</span>
                <div class="flex gap-3">
                  <button
                    @click="editTicket(t)"
                    class="hover:text-blue-300 focus:ring-2 focus:ring-blue-400 rounded"
                  >
                    ✏️
                  </button>
                  <button
                    @click="deleteTicket(t.id)"
                    class="hover:text-red-400 focus:ring-2 focus:ring-red-400 rounded"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { ref, watch, onMounted } from 'vue';

const tickets = ref([]);
const form = ref({
  title: '',
  description: '',
  status: 'open',
});
const editMode = ref(false);
const editId = ref(null);

// Load tickets
onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('ticketapp_vue_tickets')) || [];
  tickets.value = stored;
});

// Sync with localStorage
watch(
  tickets,
  (val) => {
    localStorage.setItem('ticketapp_vue_tickets', JSON.stringify(val));
  },
  { deep: true }
);


const titleError = ref('');

const handleSubmit = () => {
  titleError.value = '';
  if (!form.value.title.trim()) {
    titleError.value = 'Title is required';
    return;
  }

  if (editMode.value) {
    const idx = tickets.value.findIndex((t) => t.id === editId.value);
    if (idx !== -1) {
      tickets.value[idx] = { ...tickets.value[idx], ...form.value };
    }
    editMode.value = false;
  } else {
    tickets.value.push({
      id: Date.now(),
      title: form.value.title,
      description: form.value.description,
      status: form.value.status,
      createdAt: new Date().toLocaleString(),
    });
  }

  resetForm();
};

const editTicket = (t) => {
  editMode.value = true;
  editId.value = t.id;
  form.value = { ...t };
};

const deleteTicket = (id) => {
  if (confirm('Delete this ticket?')) {
    tickets.value = tickets.value.filter((t) => t.id !== id);
  }
};

const resetForm = () => {
  form.value = { title: '', description: '', status: 'open' };
  editMode.value = false;
  editId.value = null;
};

const badgeClass = (status) => {
  switch (status) {
    case 'open':
      return 'bg-green-400/20 text-green-300 border-green-300/30';
    case 'in_progress':
      return 'bg-amber-400/20 text-amber-300 border-amber-300/30';
    case 'closed':
      return 'bg-gray-400/20 text-gray-300 border-gray-300/30';
  }
};
</script>
