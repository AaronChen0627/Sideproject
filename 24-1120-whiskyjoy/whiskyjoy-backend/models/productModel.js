const db = require("../db");

module.exports = {
  // 取得所有產品
  getAllProducts: async () => {
    const query = `
      SELECT 
        p.id, 
        p.product_name_zh, 
        p.product_name_en, 
        p.product_image_url,
        c.country_name_zh AS country_name_zh,
        c.country_name_en AS country_name_en,
        r.region_name_zh AS region_name_zh,
        r.region_name_en AS region_name_en,
        ca.category_name_zh AS category_name_zh,
        ca.category_name_en AS category_name_en,
        b.brand_name_zh AS brand_name_zh,
        b.brand_name_en AS brand_name_en,
        b.logo_url AS brand_logo_url
      FROM Products p
      LEFT JOIN Countries c ON p.country_id = c.id
      LEFT JOIN Regions r ON p.region_id = r.id
      LEFT JOIN Categories ca ON p.category_id = ca.id
      LEFT JOIN Brands b ON p.brand_id = b.id;
    `;
    const [rows] = await db.execute(query);
    return rows;
  },

  // 刪除產品
  deleteProduct: async (id) => {
    const query = `DELETE FROM Products WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  },

  // 根據 ID 取得單一產品
  getProductById: async (id) => {
    const query = `
      SELECT 
        p.id, 
        p.product_name_zh, 
        p.product_name_en, 
        p.product_image_url,
        c.country_name_zh AS country_name_zh,
        c.country_name_en AS country_name_en,
        r.region_name_zh AS region_name_zh,
        r.region_name_en AS region_name_en,
        ca.category_name_zh AS category_name_zh,
        ca.category_name_en AS category_name_en,
        b.brand_name_zh AS brand_name_zh,
        b.brand_name_en AS brand_name_en,
        b.logo_url AS brand_logo_url
      FROM Products p
      LEFT JOIN Countries c ON p.country_id = c.id
      LEFT JOIN Regions r ON p.region_id = r.id
      LEFT JOIN Categories ca ON p.category_id = ca.id
      LEFT JOIN Brands b ON p.brand_id = b.id
      WHERE p.id = ?;
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0] || null; // 回傳單一產品或 null
  },

  // 檢查產品是否已存在（根據名稱）
  async findProductByName(product_name_zh, product_name_en) {
    const query = `
      SELECT * FROM Products
      WHERE product_name_zh = ? OR product_name_en = ?
    `;
    const [results] = await db.execute(query, [product_name_zh, product_name_en]);
    return results;
  },

  // 根據名稱取得 ID
  async findIdByName(table, nameColumn, name) {
    const query = `SELECT id FROM ${table} WHERE ${nameColumn} = ?`;
    const [results] = await db.execute(query, [name]);
    return results.length > 0 ? results[0].id : null;
  },

  // 新增產品
  async insertProduct(productData) {
    const query = `
      INSERT INTO Products (product_name_zh, product_name_en, product_image_url, country_id, region_id, category_id, brand_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const { product_name_zh, product_name_en, product_image_url, country_id, region_id, category_id, brand_id } = productData;
    await db.execute(query, [
      product_name_zh,
      product_name_en,
      product_image_url,
      country_id,
      region_id || null,
      category_id,
      brand_id,
    ]);
  },

  // 更新產品
  async updateProduct(id, productData) {
    const query = `
      UPDATE Products
      SET product_name_zh = ?, product_name_en = ?, product_image_url = ?, country_id = ?, region_id = ?, category_id = ?, brand_id = ?
      WHERE id = ?
    `;
    const { product_name_zh, product_name_en, product_image_url, country_id, region_id, category_id, brand_id } = productData;
    await db.execute(query, [
      product_name_zh,
      product_name_en,
      product_image_url,
      country_id,
      region_id || null,
      category_id,
      brand_id,
      id,
    ]);
  },
};
