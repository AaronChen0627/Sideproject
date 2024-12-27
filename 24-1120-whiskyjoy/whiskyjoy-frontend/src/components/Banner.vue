<template>
  <div class="banner-container">
    <!-- 影片背景 -->
    <video
      class="banner-video"
      autoplay
      loop
      muted
      ref="bannerVideo"
      @ended="handleVideoEnd"
    >
      <source src="@/assets/Banner-video.webm" type="video/webm" />
    </video>

    <!-- 黑色遮罩 -->
    <div class="banner-overlay">
      <div class="container">
        <div class="row justify-content-center">
          <!-- 文字內容 -->
          <div class="col-12 text-center">
            <h1>WHISKY JOY</h1>
            <p>enjoy & share your note</p>
            <router-link to="/login">
              <button class="start-button">Start</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style scoped>
.banner-container {
  position: relative;
  width: 100vw;
  height: 80vh;
  overflow: hidden;
}

.banner-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-overlay .container {
  text-align: center;
  color: white;
}

.banner-overlay h1 {
  font-size: 4rem;
  margin: 0;
}

.banner-overlay p {
  font-size: 1.5rem;
  margin: 10px 0;
}

.start-button {
  background-color: white;
  color: black;
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .banner-overlay h1 {
    font-size: 3rem;
  }

  .banner-overlay p {
    font-size: 1.2rem;
  }

  .start-button {
    padding: 12px 25px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .banner-overlay h1 {
    font-size: 2.5rem;
  }

  .banner-overlay p {
    font-size: 1rem;
  }

  .start-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
</style>
