<template>
  <div class="about-whisky-joy">
    <div class="container py-4">
      <div class="row align-items-center text-light">
        <!-- 左側 Logo 與純文字 -->
        <div
          class="col-lg-6 d-flex align-items-center justify-content-center text-center"
        >
          <img src="@/assets/logo.png" alt="Logo" class="me-3 logo" />
          <div>
            <p class="mb-1 about-text">ABOUT</p>
            <p class="mb-0 whisky-joy-text">WHISKY JOY</p>
          </div>
        </div>

        <!-- 右側文字內容 -->
        <div class="col-lg-6">
          <p class="mb-0 text-light">
            擁有威士忌專業知識與來自全球的品飲筆記，幫助您探索各種威士忌風味，
            並提供平台讓您分享個人品飲心得，與全球威士忌愛好者互動交流。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aboutwhiskyjoy",
};
</script>

<style scoped>
.about-whisky-joy {
  background-color: #000;
}
.logo {
  width: 50px;
  height: 50px;
}
.about-text,
.whisky-joy-text {
  font-size: 1.2rem;
  margin: 0;
}
</style>
