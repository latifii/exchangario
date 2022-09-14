import { useStore } from 'vuex';
import { computed } from 'vue';

export default function useAuth() {
  const store = useStore();
  const { state } = store;

  const error = computed(() => state.user.error);
  const isLoading = computed(() => state.user.isLoading);
  const isAuthenticated = computed(() => store.getters['user/isAuthenticated']);
  const user = computed(() => state.user.data);
  return { error, isLoading, isAuthenticated, user };
}
