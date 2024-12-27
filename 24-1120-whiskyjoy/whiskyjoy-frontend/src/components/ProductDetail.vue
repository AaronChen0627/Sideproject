<template>
  <div v-if="product">
    <h1>{{ product.product_name_en }}</h1>
    <img :src="product.product_image_url" alt="product.name" />
    <p>{{ product.product_name_zh }}</p>
    <p>{{ product.brand_name_en }}</p>
    <p>{{ product.category_name_en }}</p>
    <p>{{ product.region_name_en }}</p>
    <p>{{ product.country_name_en }}</p>
  </div>
  <div v-else>
    <p>載入中...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["productName"],
  data() {
    return {
      product: null,
    };
  },
  mounted() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${this.productName}`
        );
        this.product = response.data;
      } catch (error) {
        console.error("獲取產品詳細資料時出錯:", error);
      }
    },
  },
};
</script>
