<template>
  <div class="filter-container">
    <div
      class="d-flex justify-content-center align-items-center flex-wrap gap-3"
    >
      <!-- 國家篩選器 -->
      <div class="filter-group">
        <label for="country" class="form-label">國家：</label>
        <select
          id="country"
          v-model="selectedCountry"
          class="form-select short-select"
          @change="handleCountryChange"
        >
          <option value="">（請選擇國家）</option>
          <option value="蘇格蘭">蘇格蘭</option>
          <option value="愛爾蘭">愛爾蘭</option>
          <option value="日本">日本</option>
          <option value="美國">美國</option>
          <option value="加拿大">加拿大</option>
          <option value="臺灣">臺灣</option>
        </select>
      </div>

      <!-- 區域篩選器 -->
      <div class="filter-group">
        <label for="region" class="form-label">區域：</label>
        <select
          id="region"
          v-model="selectedRegion"
          :disabled="!canSelectRegion"
          class="form-select short-select"
          @change="updateFilters"
        >
          <option value="">（請選擇區域）</option>
          <option value="低地區">低地區</option>
          <option value="高地區">高地區</option>
          <option value="斯貝賽區">斯貝賽區</option>
          <option value="艾雷島區">艾雷島區</option>
          <option value="島嶼區">島嶼區</option>
          <option value="坎貝爾鎮">坎貝爾鎮</option>
        </select>
      </div>

      <!-- 種類篩選器 -->
      <div class="filter-group">
        <label for="category" class="form-label">種類：</label>
        <select
          id="category"
          v-model="selectedCategory"
          class="form-select short-select"
          @change="updateFilters"
        >
          <option value="">請選擇種類</option>
          <option value="單一麥芽">單一麥芽</option>
          <option value="原桶強度">原桶強度</option>
          <option value="單桶">單桶</option>
          <option value="調和式">調和式</option>
          <option value="調和威士忌">調和威士忌</option>
          <option value="穀物">穀物</option>
          <option value="波本">波本</option>
        </select>
      </div>

      <!-- 取消篩選按鈕 -->
      <button @click="resetFilters" class="btn btn-secondary btn-sm">
        取消篩選
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCountry: "",
      selectedRegion: "",
      selectedCategory: "",
    };
  },
  computed: {
    // 當選擇蘇格蘭時才啟用區域選擇器
    canSelectRegion() {
      return this.selectedCountry === "蘇格蘭";
    },
  },
  methods: {
    handleCountryChange() {
      if (this.selectedCountry !== "蘇格蘭") {
        this.selectedRegion = "";
      }
      this.updateFilters();
    },
    updateFilters() {
      this.$emit("update-filters", {
        country: this.selectedCountry,
        region: this.selectedRegion,
        category: this.selectedCategory,
      });
    },
    resetFilters() {
      this.selectedCountry = "";
      this.selectedRegion = "";
      this.selectedCategory = "";
      this.updateFilters();
    },
  },
};
</script>

<style scoped>
.short-select {
  width: 150px;
}

.filter-container {
  padding: 20px 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* 排列篩選器 */
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
  width: 180px;
}

button {
  align-self: center;
  margin-top: 15px; /* 按鈕與篩選器間距 */
  height: 38px; /* 統一高度 */
}
</style>
