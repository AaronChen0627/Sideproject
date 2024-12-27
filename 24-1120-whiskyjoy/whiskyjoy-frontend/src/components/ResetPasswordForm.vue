<template>
  <div>
    <h2>Enter your new password</h2>
    <form @submit.prevent="handlePasswordReset">
      <input
        type="password"
        v-model="newPassword"
        placeholder="New password"
        required
      />
      <button type="submit">Reset Password</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "ResetPasswordForm",
  props: {
    token: String,
  },
  setup(props) {
    const newPassword = ref("");
    const message = ref("");

    const handlePasswordReset = async () => {
      try {
        // 向後端發送密碼重置請求
        await axios.post("/auth/reset-password", {
          token: props.token,
          newPassword: newPassword.value,
        });
        message.value = "Password reset successfully! You can now login.";
      } catch (error) {
        message.value =
          error.response?.data?.message || "Error resetting password";
      }
    };

    return { newPassword, message, handlePasswordReset };
  },
};
</script>

<style scoped></style>
