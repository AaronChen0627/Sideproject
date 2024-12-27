const express = require('express');
const { addComment, getCommentsByProduct, updateComment, deleteComment } = require('../controllers/commentController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// 新增評論（身份驗證）
router.post('/add', authenticateUser, addComment);

// 獲取該產品所有評論
router.get('/:productId', getCommentsByProduct);  

// 更新評論（身份驗證）
router.put('/:commentId', authenticateUser, updateComment);

// 刪除評論（身份驗證）
router.delete('/:commentId', authenticateUser, deleteComment);

module.exports = router;
