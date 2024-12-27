<template>
  <div>
    <div v-if="isAuthenticated">
      <img :src="userAvatar" alt="頭像" class="navbar-avatar" />
    </div>
    <div v-else>
      <router-link to="/login" class="btn btn-warning"> 登入/註冊 </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "userAvatar"]),
  },
};
</script>

<style scoped>
.navbar-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}
</style>
