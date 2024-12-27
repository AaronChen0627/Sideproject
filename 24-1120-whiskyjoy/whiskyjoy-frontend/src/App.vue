<template>
  <Header />
  <main>
    <!-- 動態載入頁面 -->
    <router-view />
  </main>
  <Footer />
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
