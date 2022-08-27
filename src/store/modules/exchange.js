import { db } from '@/db';
import { getDocs, query, collectionGroup } from 'firebase/firestore';

const state = {
  data: [],
};

const actions = {
  async getExchanges({ commit }) {
    const exchangeQuery = query(collectionGroup(db, 'exchangario'));
    const snapshot = await getDocs(exchangeQuery);
    const exchangs = snapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    commit('setExchanges', exchangs);
  },
};

const mutations = {
  setExchanges(state, exchanges) {
    state.data = exchanges;
  },
};

export default {
  state,
  actions,
  mutations,
};
