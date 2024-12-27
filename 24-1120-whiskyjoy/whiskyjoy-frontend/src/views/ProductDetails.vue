<template>
  <div class="container my-5">
    <div v-if="product" class="row">
      <!-- 產品圖片 -->
      <div class="col-md-6 text-center">
        <img
          :src="product.product_image_url"
          alt="Product Image"
          class="img-fluid rounded shadow"
        />
      </div>

      <!-- 產品詳細資料 -->
      <div class="col-md-6">
        <h2 class="display-4">{{ product.product_name_zh }}</h2>
        <p class="lead"><strong>國家:</strong> {{ product.country_name_zh }}</p>
        <p class="lead"><strong>區域:</strong> {{ product.region_name_zh }}</p>
        <p class="lead">
          <strong>種類:</strong> {{ product.category_name_zh }}
        </p>
      </div>
    </div>

    <!-- 載入中提示 -->
    <div v-else class="text-center">
      <p class="lead">產品資料載入中...</p>
    </div>

    <!-- 評論區 -->
    <CommentSection
      v-if="product"
      :productId="product.id"
      :currentUserId="currentUserId"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CommentSection from "@/components/CommentSection.vue"; // 引入評論元件

export default {
  props: ["productName"],
  components: {
    CommentSection,
  },
  computed: {
    ...mapGetters(["allProducts", "currentUser"]), // 獲取產品列表與當前用戶
    product() {
      // 根據 URL 中的 productName 匹配對應的產品
      if (this.allProducts.length === 0) {
        return null;
      }
      return this.allProducts.find(
        (product) =>
          product.product_name_en.replace(/\s+/g, "-") === this.productName
      );
    },
    currentUserId() {
      return this.currentUser?.id || null; // 當前用戶 ID
    },
  },
  watch: {
    // 監聽 allProducts 改變，並觸發對應的處理
    allProducts(newVal) {
      if (newVal.length > 0) {
        this.product = this.allProducts.find(
          (product) =>
            product.product_name_en.replace(/\s+/g, "-") === this.productName
        );
      }
    },
  },
  mounted() {
    // 確保頁面加載時獲取產品數據
    if (this.allProducts.length === 0) {
      this.$store.dispatch("fetchProducts"); // 確保發送請求獲取產品資料
    }
  },
};
</script>

<style scoped>
.product-details img {
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
}
.product-details h2 {
  font-size: 2.5rem;
  font-weight: bold;
}
</style>
