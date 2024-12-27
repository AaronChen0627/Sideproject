<template>
  <div class="container">
    <div class="row g-3 align-items-center">
      <!-- 國家篩選器 -->
      <div class="col-12 col-md">
        <div class="filter">
          <label for="country" class="form-label">國家</label>
          <select
            id="country"
            v-model="selectedCountry"
            @change="updateRegions"
            class="form-select"
          >
            <option value="其他">其他</option>
            <option value="蘇格蘭">蘇格蘭</option>
            <option value="日本">日本</option>
            <option value="愛爾蘭">愛爾蘭</option>
            <option value="加拿大">加拿大</option>
            <option value="美國">美國</option>
            <option value="臺灣">臺灣</option>
          </select>
        </div>
      </div>

      <!-- 區域篩選器 -->
      <div class="col-12 col-md">
        <div class="filter">
          <label for="region" class="form-label">區域</label>
          <select
            id="region"
            v-model="selectedRegion"
            :disabled="selectedCountry !== '蘇格蘭'"
            class="form-select"
          >
            <option value="" disabled>請選擇區域</option>
            <option
              v-for="region in availableRegions"
              :key="region"
              :value="region"
            >
              {{ region }}
            </option>
          </select>
        </div>
      </div>

      <!-- 種類篩選器 -->
      <div class="col-12 col-md">
        <div class="filter">
          <label for="category" class="form-label">種類</label>
          <select id="category" v-model="selectedCategory" class="form-select">
            <option value="單一麥芽">單一麥芽</option>
            <option value="原桶強度">原桶強度</option>
            <option value="單桶">單桶</option>
            <option value="調和威士忌">調和威士忌</option>
            <option value="調和式">調和式</option>
            <option value="穀物">穀物</option>
            <option value="波本">波本</option>
          </select>
        </div>
      </div>

      <!-- 按鈕區 -->
      <div class="col-12 col-md-auto text-md-end">
        <div class="d-flex gap-2 mt-3 mt-md-0 justify-content-md-end">
          <button @click="applyFilters" class="btn btn-primary">篩選</button>
          <button @click="resetFilters" class="btn btn-secondary">
            取消篩選
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      selectedCountry: (state) => state.filters.country,
      selectedRegion: (state) => state.filters.region,
      selectedCategory: (state) => state.filters.category,
    }),
    availableRegions() {
      // 依照所選國家動態返回可選區域
      return this.selectedCountry === "蘇格蘭"
        ? ["低地區", "高地區", "斯貝賽區", "艾雷島區", "島嶼區", "坎貝爾鎮"]
        : [];
    },
  },
  methods: {
    ...mapActions(["applyFilters", "resetFilters"]),
    updateRegions() {
      // 選擇非蘇格蘭國家時清空區域選擇
      if (this.selectedCountry !== "蘇格蘭") {
        this.selectedRegion = "";
      }
    },
    applyFilters() {
      this.applyFilters({
        country: this.selectedCountry,
        region: this.selectedRegion,
        category: this.selectedCategory,
      });
    },
    resetFilters() {
      this.applyFilters({
        country: "其他",
        region: "",
        category: "單一麥芽",
      });
    },
  },
};
</script>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
}
</style>
