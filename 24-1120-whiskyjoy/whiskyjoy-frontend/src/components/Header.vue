<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container-fluid">
      <!-- 漢堡選單按鈕 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 導航欄 -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="row w-100">
          <!-- Logo 區塊 -->
          <div class="col-12 col-md-6 d-flex justify-content-start">
            <a class="navbar-brand ps-3 pe-3" href="#">
              <img src="@/assets/logo.png" alt="Logo" class="navbar-logo" />
              <span class="ms-2 whisky-text">WHISKY JOY</span>
            </a>
          </div>

          <!-- 導航連結與頭像區塊 -->
          <div
            class="col-12 col-md-6 d-flex justify-content-end align-items-center"
          >
            <!-- 頁面導航連結 -->
            <div class="navbar-nav">
              <router-link to="/" class="nav-link" aria-current="page"
                >Home</router-link
              >
              <router-link to="/about" class="nav-link">About US</router-link>
              <router-link to="/note" class="nav-link">Note</router-link>
            </div>

            <!-- 用戶登入或頭像顯示 -->
            <div class="ms-3">
              <LoginButton v-if="!isAuthenticated" />
              <UserLogined v-if="isAuthenticated" :user="user" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import LoginButton from "@/components/LoginButton.vue";
import UserLogined from "@/components/UserLogined.vue";

export default {
  components: {
    LoginButton,
    UserLogined,
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"]),
  },
};
</script>

<style scoped>
.navbar-logo {
  height: 40px;
  width: auto;
}

.navbar {
  background-color: #000000 !important;
}

.navbar-nav .nav-link {
  color: white;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: orange;
}

.whisky-text {
  color: #e2c997;
  font-weight: bold;
}

.btn-warning {
  background-color: orange;
  border-color: orange;
}

.btn-warning:hover {
  background-color: darkorange;
  border-color: darkorange;
}
</style>
