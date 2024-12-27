import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // 解析 token 的函數

const state = {
  token: sessionStorage.getItem('token') || null,
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  userId: null, 
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  token: (state) => state.token,
  user: (state) => state.user,
  userId: (state) => state.userId,
  currentUser: (state) => state.user,
  getUser: (state) => state.user,
};

const actions = {
  // 註冊動作
  async register({ commit }, { email, password }) {
    try {
      const response = await axios.post('http://localhost:3000/api/register', { email, password });
      const token = response.data.token;

      // 使用 jwt_decode 解析 token
      const decoded = jwtDecode(token);  // 解析 token 獲取 userId
      const userId = decoded.userId;  // 從 token 中提取 userId

      // 儲存到 Vuex 和 sessionStorage
      commit('setToken', token);
      commit('setUser', response.data.user);
      commit('setUserId', userId);  // 不再從 sessionStorage 儲存 userId，直接從 token 提取
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data.message;
    } catch (error) {
      const errorMsg = error.response?.data?.message || '註冊出錯，請稍後再試';
      console.error('註冊出錯:', errorMsg);
      throw new Error(errorMsg);
    }
  },

  // 登入動作
  async login({ commit }, { email, password }) {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      const token = response.data.token;

      // 使用 jwtDecode 解析 token
      const decoded = jwtDecode(token);  // 解析 token 獲取 userId
      const userId = decoded.userId;  // 從 token 中提取 userId

      // 儲存到 Vuex 和 sessionStorage
      commit('setToken', token);
      commit('setUser', response.data.user);
      commit('setUserId', userId);  // 不再從 sessionStorage 儲存 userId，直接從 token 提取
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data.message;
    } catch (error) {
      const errorMsg = error.response?.data?.message || '登入出錯，請稍後再試';
      console.error('登入出錯:', errorMsg);
      throw new Error(errorMsg);
    }
  },

  // 登出動作
  logout({ commit }) {
    commit('clearToken');
    commit('clearUser');
    commit('clearUserId');  // 清除 userId
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },

  // 更新用戶資料
  async updateUserProfile({ commit }, { account, avatar_url }) {
    try {
      const token = sessionStorage.getItem('token');
      console.log("Updating user profile with:", { account, avatar_url });

      const response = await axios.put(
        'http://localhost:3000/api/user/profile', 
        { account, avatar_url },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 使用 Bearer Token 進行認證
          },
        }
      );
      
      // 更新成功後，更新 store 中的用戶資料
      commit('setUser', response.data);
      sessionStorage.setItem('user', JSON.stringify(response.data)); // 儲存更新後的資料

      return response.data.message;
    } catch (error) {
      console.error("Profile update failed:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || '更新資料失敗');
    }
  },
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
  setUser: (state, user) => {
    state.user = user;
  },
  setUserId: (state, userId) => {
    state.userId = userId;  // 儲存 userId
  },
  clearToken: (state) => {
    state.token = null;
  },
  clearUser: (state) => {
    state.user = null;
  },
  clearUserId: (state) => {
    state.userId = null;  // 清除 userId
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
