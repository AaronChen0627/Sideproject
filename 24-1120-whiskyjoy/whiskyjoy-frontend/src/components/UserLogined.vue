<template>
  <div class="user-info">
    <!-- 顯示用戶頭像 -->
    <img
      v-if="user && user.avatar_url"
      :src="user.avatar_url"
      alt="Avatar"
      class="user-avatar"
      @click="toggleDropdown"
    />

    <!-- 顯示用戶帳號 -->
    <span v-if="user">{{ user.account }}</span>

    <!-- 下拉選單 -->
    <div v-show="dropdownVisible" class="dropdown-menu">
      <button @click="logout" class="dropdown-item">登出</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dropdownVisible: false, // 控制下拉選單顯示
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible; // 切換下拉選單顯示狀態
    },
    logout() {
      this.$store.dispatch("logout"); // 呼叫 Vuex 的登出行為
      this.$router.push("/login"); // 登出後導向登入頁
    },
  },
};
</script>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.user-info span {
  color: white;
  font-weight: bold;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #333;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  padding: 10px;
  display: block;
}

.dropdown-item {
  width: 100%;
  padding: 8px;
  color: white;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #555;
}
</style>
