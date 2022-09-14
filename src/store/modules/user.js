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
  data: null,
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
  setUser(state, user) {
    state.data = user;
  },
};

const actions = {
  onAuthChange(context) {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
         await context.dispatch('getUserProfile', user);
      } else {
        console.log('Logged out');
      }
    });
  },
  // Get user profile
  async getUserProfile(context, user) {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    const userProfile = docSnap.data();
    const userWithProfile = {
      id: user.uid,
      email: user.email,
      ...userProfile,
    };
    context.commit('setUser', userWithProfile);
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
  // Create user profile
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
