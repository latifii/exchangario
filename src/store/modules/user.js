import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../db';

const state = {
  isLoading: false,
  error: null,
  data: null,
};

const getters = {
  isAuthenticated(state) {
    return !!state.data;
  },
};

const mutations = {
  setUserStart(state) {
    state.isLoading = true;
    state.error = null;
  },
  setUserSuccess(state) {
    state.isLoading = false;
  },
  setUserFailer(state, payload) {
    state.isLoading = false;
    state.error = payload;
  },
  setUser(state, user) {
    state.data = user;
  },
  updateProfile(state, profile) {
    state.data = { ...state.data, ...profile };
  },
};

const actions = {
  onAuthChange(context) {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        await context.dispatch('getUserProfile', user);
      } else {
        console.log('Logged out');
      }
    });
  },
  // Update User
  async updateProfile(context, { data, onSuccess }) {
    context.commit('setUserStart');
    try {
      const docRef = doc(db, 'users', data.id);
      await updateDoc(docRef, data);
      context.commit('updateProfile', data);
      context.commit('setUserSuccess');
      context.dispatch(
        'toast/success',
        'You have successfully Updata Profile',
        {
          root: true,
        }
      );
      onSuccess();
    } catch (error) {
      context.commit('setUserFailer', error.message);
      context.dispatch('toast/error', error.message, { root: true });
    }
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
    // console.lo/g(user)
    context.commit('setUser', userWithProfile);
  },
  // Login user
  async login(context, { email, password }) {
    context.commit('setUserStart');
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      context.dispatch('getUserProfile', user);
      context.commit('setUserSuccess');
      context.dispatch('toast/success', 'You have successfully login', {
        root: true,
      });
    } catch (error) {
      context.commit('setUserFailer', error.message);
      context.dispatch('toast/error', error.message, { root: true });
    }
  },
  // logout user
  async logout(context) {
    context.commit('setUserStart');
    const auth = getAuth();
    try {
      await signOut(auth);
      context.commit('setUserSuccess');
      context.commit('setUser', null);
      context.dispatch('toast/success', 'You have successfully logout', {
        root: true,
      });
    } catch (error) {
      context.commit('setUserFailer', error.message);
      context.dispatch('toast/error', error.message, { root: true });
      console.log(error.message);
    }
  },
  // l
  async register(context, { email, password, username }) {
    context.commit('setUserStart');
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
      context.commit('setUserSuccess');
      context.dispatch('toast/success', 'You have successfully registered', {
        root: true,
      });
    } catch (e) {
      context.commit('setUserFailer', e.message);
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
  getters,
  mutations,
  actions,
};
