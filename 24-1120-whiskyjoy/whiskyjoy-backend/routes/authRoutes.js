const express = require('express');
const AuthController = require('../controllers/authController'); // 引入控制器
const authMiddleware = require('../middleware/authMiddleware'); // 引入身份驗證中間件

const router = express.Router();

// 用戶註冊
router.post('/register', AuthController.register);

// 用戶登入
router.post('/login', AuthController.login);

// 更新個人資料
router.put(
  '/user/profile',
  authMiddleware.authenticateUser,  // 使用 authenticateUser 中間件進行身份驗證
  AuthController.updateProfile      // 如果身份驗證通過，則執行更新操作
);

module.exports = router;
