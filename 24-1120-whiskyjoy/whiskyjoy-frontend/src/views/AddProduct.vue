<template>
  <div class="add-product">
    <h2>新增產品</h2>

    <form @submit.prevent="handleSubmit">
      <!-- 產品名稱 -->
      <div>
        <label for="product_name_zh">產品名稱 (中文)</label>
        <input
          type="text"
          id="product_name_zh"
          v-model="product_name_zh"
          required
        />
      </div>

      <div>
        <label for="product_name_en">產品名稱 (英文)</label>
        <input
          type="text"
          id="product_name_en"
          v-model="product_name_en"
          required
        />
      </div>

      <!-- 產品圖片 -->
      <div>
        <label for="product_image_url">產品圖片 URL</label>
        <input
          type="url"
          id="product_image_url"
          v-model="product_image_url"
          required
        />
      </div>

      <!-- 品牌選擇 -->
      <div>
        <label for="brand_id">品牌</label>
        <select id="brand_id" v-model="brand_id" required>
          <option v-for="brand in brands" :key="brand._id" :value="brand._id">
            {{ brand.brand_name_zh }}
          </option>
        </select>
      </div>

      <!-- 國家選擇 -->
      <div>
        <label for="country_id">國家</label>
        <select
          id="country_id"
          v-model="country_id"
          @change="handleCountryChange"
          required
        >
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>

      <!-- 區域選擇 -->
      <div v-if="country_id === '蘇格蘭'">
        <label for="region_id">區域</label>
        <select id="region_id" v-model="region_id" required>
          <option v-for="region in regions" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>

      <!-- 類別選擇 -->
      <div>
        <label for="category_id">類別</label>
        <select id="category_id" v-model="category_id" required>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <button type="submit">新增產品</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product_name_zh: "",
      product_name_en: "",
      product_image_url: "",
      brand_id: "",
      country_id: "蘇格蘭",
      region_id: "",
      category_id: "單一麥芽",

      brands: [],
      countries: ["愛爾蘭", "蘇格蘭", "加拿大", "日本", "美國", "臺灣", "其他"],
      regions: ["低地區", "高地區", "斯貝賽", "艾雷島區", "島嶼區", "坎貝爾鎮"],
      categories: [
        "單一麥芽",
        "原桶強度",
        "單桶",
        "調和威士忌",
        "調和式",
        "穀物",
        "波本",
      ],
    };
  },
  created() {
    this.fetchBrands();
  },
  methods: {
    // 獲取品牌列表
    async fetchBrands() {
      try {
        const response = await axios.get("http://localhost:3000/api/brands");
        this.brands = response.data;
      } catch (error) {
        console.error("獲取品牌資料時出錯:", error);
      }
    },

    // 當國家改變時，重新設定區域選項
    handleCountryChange() {
      if (this.country_id !== "蘇格蘭") {
        this.region_id = ""; // 如果選擇非蘇格蘭，清空區域
      }
    },

    // 提交表單
    async handleSubmit() {
      try {
        const productData = {
          product_name_zh: this.product_name_zh,
          product_name_en: this.product_name_en,
          product_image_url: this.product_image_url,
          country_id: this.country_id,
          region_id: this.region_id,
          category_id: this.category_id,
          brand_id: this.brand_id,
        };

        // 向後端提交新增產品的請求
        await axios.post("http://localhost:3000/api/products", productData);
        alert("產品新增成功");
        this.$router.push("/products"); // 產品新增後跳轉到產品列表頁面
      } catch (error) {
        console.error("新增產品時出錯:", error);
        alert("新增產品失敗");
      }
    },
  },
};
</script>

<style scoped>
.add-product {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input,
select {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
