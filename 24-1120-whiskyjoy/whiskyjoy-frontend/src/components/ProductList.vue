<template>
  <div class="container my-4">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <router-link
        v-for="product in filteredProducts"
        :key="product.id"
        :to="`/product/${product.product_name_en.replace(/\s+/g, '-')}`"
        class="col text-decoration-none"
      >
        <div class="card h-100">
          <img
            :src="product.product_image_url"
            class="card-img-top"
            :alt="product.product_name_zh"
          />
          <div class="card-body">
            <!-- 小字英文 -->
            <p class="card-subtitle">{{ product.product_name_en }}</p>
            <!-- 大標題中文 -->
            <h5 class="card-title">{{ product.product_name_zh }}</h5>
            <p class="card-text text-muted">
              {{ product.country_name_zh }}
              <span v-if="product.region_name_zh"
                >| {{ product.region_name_zh }}</span
              >
              <span v-if="product.category_name_zh"
                >| {{ product.category_name_zh }}</span
              >
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filteredProducts: Array,
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.card img {
  object-fit: contain;
  height: 200px;
  width: 100%;
}
.card-body {
  text-align: center;
}
.card-title {
  font-size: 1.2rem;
  color: #333;
  font-weight: normal;
}
.card-subtitle {
  font-size: 0.8rem;
  color: #4b3832;
  margin-bottom: 0.5rem;
}
.card-text {
  font-size: 0.9rem;
  color: #666;
  font-weight: normal;
}
.text-decoration-none {
  text-decoration: none;
  color: inherit;
}
</style>
