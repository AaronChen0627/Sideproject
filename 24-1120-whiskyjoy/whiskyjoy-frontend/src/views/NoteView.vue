<template>
  <div>
    <Filter @update-filters="applyFilters" />
    <ProductList :filteredProducts="filteredProducts" />
  </div>
</template>

<script>
import Filter from "@/components/Filter.vue";
import ProductList from "@/components/ProductList.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Filter,
    ProductList,
  },
  data() {
    return {
      filters: {
        country: "",
        region: "",
        category: "",
      },
      filteredProducts: [],
    };
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    applyFilters(filters) {
      this.filters = filters; // 更新篩選條件
      this.getFilteredProducts();
    },
    async getFilteredProducts() {
      // 獲取所有產品
      await this.fetchProducts();
      console.log("篩選條件", this.filters); // 打印當前篩選條件
      console.log("所有產品", this.$store.getters.allProducts); // 打印所有產品

      // 根據篩選條件過濾產品
      this.filteredProducts = this.$store.getters.allProducts.filter(
        (product) => {
          console.log("檢查產品", product);
          return (
            (!this.filters.country ||
              product.country_name_zh === this.filters.country) &&
            (!this.filters.region ||
              product.region_name_zh === this.filters.region) &&
            (!this.filters.category ||
              product.category === this.filters.category) // 避免與後端資料不同
          );
        }
      );
    },
  },
  watch: {
    filters: "getFilteredProducts",
  },
  mounted() {
    this.getFilteredProducts();
  },
};
</script>
