const db = require('../db');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // 檢查品牌是否存在
  checkBrandExists: async (brand_name_zh, brand_name_en) => {
    const query = `
      SELECT id FROM Brands 
      WHERE brand_name_zh = ? OR brand_name_en = ?
    `;
    const [rows] = await db.execute(query, [brand_name_zh, brand_name_en]);
    return rows.length > 0;
  },

  // 創建品牌
  createBrand: async (id, brand_name_zh, brand_name_en, logo_url) => {
    const query = `
      INSERT INTO Brands (id, brand_name_zh, brand_name_en, logo_url)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [id, brand_name_zh, brand_name_en, logo_url]);
    return result;
  },

  // 獲取所有品牌
  getAllBrands: async () => {
    const query = 'SELECT * FROM Brands';
    const [results] = await db.execute(query);
    return results;
  },

  // 獲取單個品牌
  getBrandById: async (id) => {
    const query = 'SELECT * FROM Brands WHERE id = ?';
    const [results] = await db.execute(query, [id]);
    if (results.length === 0) {
      throw new Error('品牌未找到');
    }
    return results[0];
  },

  // 更新品牌
  updateBrand: async (id, brand_name_zh, brand_name_en, logo_url) => {
    const query = `
      UPDATE Brands 
      SET brand_name_zh = ?, brand_name_en = ?, logo_url = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [brand_name_zh, brand_name_en, logo_url, id]);
    if (result.affectedRows === 0) {
      throw new Error('品牌未找到');
    }
    return '品牌更新成功';
  },

  // 刪除品牌
  deleteBrand: async (id) => {
    const query = 'DELETE FROM Brands WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      throw new Error('品牌未找到');
    }
    return '品牌刪除成功';
  },
};
