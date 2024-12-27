import { createStore } from 'vuex'; 
import products from './products';  
import auth from './auth';
const store = createStore({
  modules: {
    products,
    auth, 
  },
});
export default store;
