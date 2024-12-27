<template>
  <div>
    <h2>更新個人資料</h2>
    <form @submit.prevent="updateProfile">
      <div>
        <label for="account">帳號</label>
        <input type="text" id="account" v-model="account" required />
      </div>
      <div>
        <label for="avatar_url">頭像 URL</label>
        <input type="url" id="avatar_url" v-model="avatarUrl" />
      </div>
      <button type="submit" :disabled="loading">更新資料</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      account: "",
      avatarUrl: "",
      loading: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  mounted() {
    if (this.user) {
      this.account = this.user?.account || "";
      this.avatarUrl = this.user?.avatar_url || "";
    }
  },
  methods: {
    ...mapActions(["updateUserProfile"]),
    async updateProfile() {
      this.loading = true;
      try {
        console.log("Request Data:", {
          account: this.account,
          avatar_url: this.avatarUrl,
        });
        await this.updateUserProfile({
          account: this.account,
          avatar_url: this.avatarUrl,
        });

        alert("資料更新成功！");
        this.$router.push("/note");
      } catch (error) {
        console.error("Profile update error:", error.message);
        alert(error.message || "更新資料失敗，請稍後再試！");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
