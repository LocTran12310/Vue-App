import { createStore } from "vuex";
import { API } from "@/utils/api";

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        API.post('/login', user).then((res) => {
          context.commit('setUser', res.data);
          resolve(res?.data);
        }).catch((err) => {
          reject(err);
        })
      })
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        API.get('/logout').then((res) => {
          context.commit('setUser', {});
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      })
    },
  },
  modules: {},
});
