const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthModel = require('../models/authModel');

// JWT 密鑰
const JWT_SECRET = process.env.JWT_SECRET;

// 註冊用戶
exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 檢查用戶是否已經註冊
    const existingUser = await AuthModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: '信箱已經註冊' });
    }

    // 密碼加密
    const passwordHash = await bcrypt.hash(password, 10);

    // 創建新用戶
    await AuthModel.createUser(email, passwordHash);

    res.status(201).json({ message: '註冊成功，請登入' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '伺服器錯誤，請稍後再試' });
  }
};

// 登入用戶
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 根據 email 查找用戶
    const user = await AuthModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: '信箱或密碼錯誤' });
    }

    // 驗證密碼
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: '信箱或密碼錯誤' });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 查找用戶的個人資料
    const profile = await AuthModel.findUserProfile(user.id);

    // 根據用戶角色回傳不同訊息
    const response = {
      token,
      user: { account: profile ? profile.account : null, avatar_url: profile ? profile.avatar_url : null },
      message: user.role === 'admin' 
        ? '登入成功，趕快新增產品吧！'
        : profile
          ? '您的資料都有了，趕快寫筆記吧！'
          : '請先更新個人資料!'
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '伺服器錯誤，請稍後再試' });
  }
};

// 更新用戶個人資料
exports.updateProfile = async (req, res) => {
  const { account, avatar_url } = req.body;
  const userId = req.user.id;  

  try {
    // 確保傳入的資料有效
    if (!account || !avatar_url) {
      return res.status(400).json({ message: 'account 和 avatar_url 不能為空' });
    }

    // 更新或創建資料
    const result = await AuthModel.updateUserProfile(userId, account, avatar_url);


    if (result > 0) {
      return res.status(200).json({ account, avatar_url });
    } else {
      return res.status(400).json({ message: '更新資料失敗' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
};
