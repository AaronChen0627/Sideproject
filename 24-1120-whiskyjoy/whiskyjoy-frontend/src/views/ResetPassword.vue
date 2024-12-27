// Profile.vue
<script>
export default {
  data() {
    return {
      profile: {
        account: "",
        avatar_url: "",
      },
    };
  },
  mounted() {
    if (this.$route.query.redirectToProfile) {
      this.redirectToProfile();
    } else {
      this.fetchUserProfile();
    }
  },
  methods: {
    // 獲取用戶的個人資料
    async fetchUserProfile() {
      try {
        const response = await this.$axios.get("/api/user/profile"); // 更新這裡的 API 路徑
        if (response.data) {
          this.profile = response.data;
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    // 更新用戶資料
    async updateProfile() {
      try {
        const response = await this.$axios.put(
          "/api/user/profile", // 確保這裡的 API 路徑正確
          this.profile
        );
        alert("個人資料更新成功");
        this.$router.push("/home");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("更新失敗");
      }
    },
    redirectToProfile() {
      this.$router.push("/update-profile");
    },
  },
};
</script>
