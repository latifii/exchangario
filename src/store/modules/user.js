import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../db';

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
  onAuthChange(context) {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userProfile = await context.dispatch('getUserProfile', user.uid);
        console.log('user login', userProfile);
      } else {
        console.log('Logged out');
      }
    });
  },
  async getUserProfile(_, id) {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  },
  async register(context, { email, password, username }) {
    context.commit('getUserStart');
    const auth = getAuth();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await context.dispatch('createUserProfile', {
        id: user.uid,
        username,
        avatar:
          'https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png',
        credit: 0,
        exchanges: [],
      });
      context.commit('getUserSuccess');
      context.dispatch('toast/success', 'You have successfully registered', {
        root: true,
      });
    } catch (e) {
      context.commit('getUserFailer', e.message);
      context.dispatch('toast/error', e.message, { root: true });
    }
  },
  async createUserProfile(_, { id, ...profile }) {
    await setDoc(doc(db, 'users', id), profile);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
