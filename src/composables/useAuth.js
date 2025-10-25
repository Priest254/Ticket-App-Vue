import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(JSON.parse(localStorage.getItem('ticketapp_user')) || null);
const isLoggedIn = ref(!!localStorage.getItem('ticketapp_session'));

export function useAuth() {
  const router = useRouter();

  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem('ticketapp_user'));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      user.value = savedUser;
      localStorage.setItem('ticketapp_session', 'true');
      isLoggedIn.value = true;
      router.push('/dashboard');
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem('ticketapp_user', JSON.stringify(newUser));
    localStorage.setItem('ticketapp_session', 'true');
    user.value = newUser;
    isLoggedIn.value = true;
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('ticketapp_session');
    isLoggedIn.value = false;
    router.push('/auth/login');
  };

  return {
    user: computed(() => user.value),
    isLoggedIn: computed(() => isLoggedIn.value),
    login,
    signup,
    logout,
  };
}
