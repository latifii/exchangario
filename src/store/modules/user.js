import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const actions = {
  async register(_, { email, password }) {
    const auth = getAuth();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert('User has been registered!');
      return userCredentials.user;
    } catch (e) {
      console.error(e.message);
    }
  },
};

export default {
  namespaced: true,
  actions,
};