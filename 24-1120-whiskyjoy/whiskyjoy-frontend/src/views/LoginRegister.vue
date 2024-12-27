<template>
  <div class="login-register">
    <h2>{{ isRegister ? "註冊" : "登入" }}</h2>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">{{ isRegister ? "註冊" : "登入" }}</button>
    </form>

    <button @click="toggleForm">
      {{ isRegister ? "已有帳號？登入" : "沒有帳號？註冊" }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isRegister: false, // 控制是否顯示註冊表單
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const action = this.isRegister ? "register" : "login";
        const response = await this.$store.dispatch(action, {
          email: this.email,
          password: this.password,
        });

        if (response) {
          switch (response) {
            case "登入成功，趕快新增產品吧！":
              this.$router.push("/add-product");
              break;
            case "您的資料都有了，趕快寫筆記吧！":
              this.$router.push("/note");
              break;
            case "請先更新個人資料!":
              this.$router.push("/update-profile");
              break;
            default:
              alert("未知的回應: " + response);
          }
        } else {
          alert("無效的響應消息！");
        }
      } catch (error) {
        alert("錯誤: " + error.message);
      }
    },
    toggleForm() {
      this.isRegister = !this.isRegister; // 切換註冊/登入表單
      this.email = "";
      this.password = "";
    },
  },
};
</script>
<style scoped>
.login-register {
  max-width: 400px;
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

input {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 10px;
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

button[type="submit"] {
  background-color: #28a745;
}

button[type="submit"]:hover {
  background-color: #218838;
}
</style>
