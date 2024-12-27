const db = require('../db'); // 你的資料庫配置
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT 密鑰
const JWT_SECRET = process.env.JWT_SECRET;

// 用戶模型
const AuthModel = {
  // 根據用戶ID查找用戶
  async findById(userId) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0];  // 返回找到的用戶資料
  },

  // 根據 email 查找用戶
  async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];  // 返回找到的用戶資料
  },

  // 創建新用戶
  async createUser(email, password_hash, role = 'user') {
    const [result] = await db.execute(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      [email, password_hash, role]
    );
    return result.insertId;
  },

  // 查找用戶的個人資料
  async findUserProfile(userId) {
    const [rows] = await db.execute('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);
    return rows[0];  // 如果沒找到資料，會返回 undefined
  },

  // 創建用戶資料
  async createUserProfile(userId, account, avatar_url) {
    const [result] = await db.execute(
      'INSERT INTO user_profiles (user_id, account, avatar_url) VALUES (?, ?, ?)',
      [userId, account, avatar_url]
    );
    return result.insertId;
  },

  // 更新用戶資料
  async updateUserProfile(userId, account, avatar_url) {
    const existingProfile = await this.findUserProfile(userId);

    // 如果沒有找到資料，則執行插入操作
    if (!existingProfile) {
      return await this.createUserProfile(userId, account, avatar_url);
    }

    // 如果已經有資料，則執行更新操作
    const [result] = await db.execute(
      'UPDATE user_profiles SET account = ?, avatar_url = ? WHERE user_id = ?',
      [account, avatar_url, userId]
    );
    return result.affectedRows;
  },

  // 驗證密碼
  async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
};

module.exports = AuthModel;
