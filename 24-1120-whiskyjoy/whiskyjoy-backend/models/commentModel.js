const pool = require('../db'); 

// 检查用户是否對某產品已經評論
const checkCommentExists = async (userId, productId) => {
  const query = 'SELECT * FROM comments WHERE user_id = ? AND product_id = ?';
  const [rows] = await pool.query(query, [userId, productId]);
  return rows.length > 0;
};

// 創立新評論
const createComment = async (userId, productId, comment) => {
    console.log('Creating comment with:', userId, productId, comment);
  const query = 'INSERT INTO comments (id, user_id, product_id, comment) VALUES (UUID(), ?, ?, ?)';
  const [result] = await pool.query(query, [userId, productId, comment]);
  return result;
};

const getCommentsByProductFromDb = async (productId) => {
  try {
    const query = `
      SELECT 
        comments.id,
        comments.user_id,
        comments.product_id,
        comments.comment,
        comments.created_at,
        comments.updated_at,
        user_profiles.account,
        user_profiles.avatar_url
      FROM 
        comments
      JOIN 
        users ON comments.user_id = users.id
      JOIN 
        user_profiles ON users.id = user_profiles.user_id
      WHERE 
        comments.product_id = ?;
    `;
    const [rows] = await pool.query(query, [productId]);
    return rows;
  } catch (error) {
    throw new Error('数据库查询失败');
  }
};

// 更新評論
const updateCommentInDb = async (commentId, userId, comment) => {
  const query = 'UPDATE comments SET comment = ? WHERE id = ? AND user_id = ?';
  const [result] = await pool.query(query, [comment, commentId, userId]);
  return result;
};

// 刪除評論
const deleteCommentInDb = async (commentId, userId) => {
  const query = 'DELETE FROM comments WHERE id = ? AND user_id = ?';
  const [result] = await pool.query(query, [commentId, userId]);
  return result;
};

module.exports = {
  checkCommentExists,
  createComment,
  getCommentsByProductFromDb,
  updateCommentInDb,
  deleteCommentInDb,
};
