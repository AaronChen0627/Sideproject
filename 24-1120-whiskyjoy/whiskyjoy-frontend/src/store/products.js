import axios from 'axios';

const state = {
  products: [],
  filters: {
    country: null, 
    region: null,
    category: null,
  },
};

const getters = {
  allProducts: (state) => state.products,
  filters: (state) => state.filters,
  filteredProducts: (state) => {
    return state.products.filter((product) => {
      const matchesCountry = state.filters.country
        ? product.country_name_zh === state.filters.country
        : true;
      const matchesRegion = state.filters.region
        ? product.region_name_zh === state.filters.region
        : true;
      const matchesCategory = state.filters.category
        ? product.category_name_zh === state.filters.category
        : true;

      return matchesCountry && matchesRegion && matchesCategory;
    });
  },
};

const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/api/products/');
      commit('setProducts', response.data);
    } catch (error) {
      console.error('獲取產品資料時出錯:', error);
    }
  },
  applyFilters({ commit }, filters) {
    commit('setFilters', filters);
  },
};

const mutations = {
  setProducts: (state, products) => {
    state.products = products;
  },
  setFilters: (state, filters) => {
    state.filters = filters;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
