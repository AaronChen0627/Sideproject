<template>
  <div class="comment-section">
    <h3>評論</h3>
    <!-- 無評論提示 -->
    <div v-if="comments.length === 0" class="text-center">
      <p>此產品目前沒有評論，快來寫一則吧！</p>
    </div>

    <!-- 顯示評論 -->
    <div v-else>
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comment d-flex align-items-start"
      >
        <img :src="comment.avatar_url" alt="User Avatar" class="avatar me-3" />
        <div>
          <p>
            <strong>{{ comment.account }}</strong>
          </p>
          <p>{{ comment.comment }}</p>
          <small class="text-muted">
            {{ new Date(comment.created_at).toLocaleString() }}
          </small>
          <!-- 僅當前用戶可以編輯或刪除自己的評論 -->
          <div v-if="comment.user_id === currentUserId" class="mt-2">
            <button
              v-if="!isEditing || editingCommentId !== comment.id"
              @click="editComment(comment)"
              class="btn btn-warning btn-sm"
            >
              編輯
            </button>
            <button
              v-if="isEditing && editingCommentId === comment.id"
              @click="saveComment()"
              class="btn btn-success btn-sm"
            >
              儲存
            </button>
            <button
              @click="deleteComment(comment.id)"
              class="btn btn-danger btn-sm"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 編輯或新增評論 -->
    <div class="mt-3">
      <textarea
        v-model="newCommentContent"
        class="form-control"
        rows="3"
        :placeholder="isEditing ? '編輯您的評論...' : '寫下您的評論...'"
      ></textarea>
      <button
        @click="isEditing ? saveComment() : addComment()"
        class="btn btn-primary mt-2"
      >
        {{ isEditing ? "儲存評論" : "新增評論" }}
      </button>
    </div>

    <!-- 錯誤提示 -->
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  name: "CommentSection",
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newCommentContent: "",
      isEditing: false,
      editingCommentId: null,
      errorMessage: "",
    };
  },
  computed: {
    currentUserId() {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          return decoded.userId;
        } catch (error) {
          console.error("解析 token 時出錯:", error);
          return null;
        }
      }
      return null;
    },
  },
  methods: {
    async fetchComments() {
      if (!this.productId) {
        console.error("無效的產品 ID");
        return;
      }

      try {
        const response = await axios.get(`/comments/${this.productId}`);

        this.comments = response.data.comments || [];
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error("獲取評論時出錯:", error);
          this.errorMessage = "無法載入評論，請稍後再試";
        }
      }
    },
    addComment() {
      const existingComment = this.comments.find(
        (comment) => comment.user_id === this.currentUserId
      );
      if (existingComment) {
        this.errorMessage = "您已經評論過了，請直接修改！";
        return;
      }

      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("未找到有效的 token");
        return;
      }
      axios
        .post(
          "/comments/add",
          {
            productId: this.productId,
            comment: this.newCommentContent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          this.fetchComments();
          this.newCommentContent = "";
          this.errorMessage = "";
        })
        .catch((error) => {
          console.error("新增評論時出錯:", error.response || error);
        });
    },
    editComment(comment) {
      this.isEditing = true;
      this.editingCommentId = comment.id;
      this.newCommentContent = comment.comment;
    },
    saveComment() {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("未找到有效的 token");
        return;
      }
      axios
        .put(
          `/comments/${this.editingCommentId}`,
          {
            comment: this.newCommentContent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          this.fetchComments();
          this.isEditing = false;
          this.editingCommentId = null;
          this.newCommentContent = "";
          this.errorMessage = "";
        })
        .catch((error) => {
          console.error("更新評論時出錯:", error);
        });
    },
    deleteComment(commentId) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("未找到有效的 token");
        return;
      }
      axios
        .delete(`/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          this.comments = this.comments.filter(
            (comment) => comment.id !== commentId
          );
        })
        .catch((error) => {
          console.error("刪除評論時出錯:", error);
        });
    },
  },
  mounted() {
    this.fetchComments();
  },
};
</script>

<style scoped>
.comment {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
textarea {
  width: 100%;
}
button {
  margin-top: 10px;
}
.alert {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 10px;
  border-radius: 5px;
}
</style>
