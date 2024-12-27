const jwt = require('jsonwebtoken');
const AuthModel = require('../models/authModel');  // 引入 authModel

// 驗證用戶身份的中間件
const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  try {
    // 解碼 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // 根據 decoded.userId 查找用戶
    const userId = decoded.userId; // 這裡是 UUID
    console.log('Decoded userId:', userId); // 輸出用戶 ID

    // 查找用戶，這裡假設 `findById` 是根據 UUID 查找用戶
    const user = await AuthModel.findById(userId); 
    console.log('User found:', user);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized, user not found' });
    }

    // 把用戶資料附加到請求對象中
    req.user = user;
    next(); // 呼叫下一個中間件或處理函數
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


module.exports = { authenticateUser };
