const {
    checkCommentExists,
    createComment,
    getCommentsByProductFromDb,
    updateCommentInDb,
    deleteCommentInDb,
  } = require('../models/commentModel');
  
  // 新增評論
  const addComment = async (req, res) => {
    const { productId, comment } = req.body; 
    const userId = req.user.id; 
  
    try {
      // 檢查是否評論過
      const commentExists = await checkCommentExists(userId, productId);
      if (commentExists) {
        return res.status(400).json({ message: '您已經對該產品發表過評論' });
      }
  
      //創建評論
      const result = await createComment(userId, productId, comment);
      res.status(201).json({ message: '評論創建成功', result });
    } catch (error) {
      console.error('創建評論失敗:', error);
      res.status(500).json({ message: '無法創建評論' });
    }
  };
  
// 獲取特定產品的所有評論
const getCommentsByProduct = async (req, res) => {
    const { productId } = req.params; 
  
    try {
      const comments = await getCommentsByProductFromDb(productId); // 调用模型方法查询数据库
      
      if (comments.length === 0) {
        return res.status(200).json({ comments: [] });
      }
      res.status(200).json({ comments });
    } catch (error) {
      console.error('獲取產品評論時出錯:', error);
      res.status(500).json({ message: '無法獲取產品評論' });
    }
  };
  
  
  // 更新評論
  const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;
  
    try {
      const result = await updateCommentInDb(commentId, userId, comment);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: '找不到该评论，或者您无权更新' });
      }
      res.status(200).json({ message: '评论更新成功' });
    } catch (error) {
      console.error('更新评论时出错:', error);
      res.status(500).json({ message: '无法更新评论' });
    }
  };
  
  // 删除评论
  const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
  
    try {
      const result = await deleteCommentInDb(commentId, userId);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: '找不到該評論或是你無權利刪除' });
      }
      res.status(200).json({ message: '評論刪除成功' });
    } catch (error) {
      console.error('刪除評論時出錯:', error);
      res.status(500).json({ message: '無法刪除評論' });
    }
  };
  
  module.exports = {
    addComment,
    getCommentsByProduct,
    updateComment,
    deleteComment,
  };
  