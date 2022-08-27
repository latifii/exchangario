import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const state = {
  isLoading: false,
  error: null,
};

const mutations = {
  getUserStart(state) {
    state.isLoading = true;
    state.error = null;
  },
  getUserSuccess(state) {
    state.isLoading = false;
  },
  getUserFailer(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
};

const actions = {
  async register(context, { email, password }) {
    context.commit('getUserStart')
    const auth = getAuth();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert('User has been registered!');
      context.commit('getUserSuccess')
      return userCredentials.user;
    } catch (e) {
      context.commit('getUserFailer',e.message)
      console.error(e.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
