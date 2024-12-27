const pool = require('../db'); // 資料庫連接

// 檢查品牌是否存在
const checkBrandExists = async (brand_name_zh, brand_name_en) => {
  const query = `
    SELECT id FROM Brands 
    WHERE brand_name_zh = ? OR brand_name_en = ?
  `;
  const [rows] = await pool.query(query, [brand_name_zh, brand_name_en]);
  return rows.length > 0;
};

// 1. 創建品牌
exports.createBrand = async (req, res) => {
  const { brand_name_zh, brand_name_en, logo_url } = req.body;

  try {
    // 檢查是否已存在相同品牌名稱
    const exists = await checkBrandExists(brand_name_zh, brand_name_en);
    if (exists) {
      return res.status(400).json({ error: 'Brand with the same name already exists' });
    }

    const [result] = await pool.query(
      'INSERT INTO Brands (id, brand_name_zh, brand_name_en, logo_url) VALUES (UUID(), ?, ?, ?)',
      [brand_name_zh, brand_name_en, logo_url]
    );

    res.status(201).json({
      id: result.insertId,
      brand_name_zh,
      brand_name_en,
      logo_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create brand' });
  }
};

// 2. 取得所有品牌
exports.getAllBrands = async (req, res) => {
  try {
    const [brands] = await pool.query('SELECT * FROM Brands');
    res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
};

// 3. 取得單一品牌
exports.getBrandById = async (req, res) => {
  const { id } = req.params;

  try {
    const [brand] = await pool.query('SELECT * FROM Brands WHERE id = ?', [id]);
    if (brand.length === 0) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json(brand[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
};

// 4. 更新品牌
exports.updateBrand = async (req, res) => {
  const { id } = req.params;
  const { brand_name_zh, brand_name_en, logo_url } = req.body;

  try {
    // 檢查是否已存在相同品牌名稱（排除當前品牌）
    const query = `
      SELECT id FROM Brands 
      WHERE (brand_name_zh = ? OR brand_name_en = ?) AND id != ?
    `;
    const [rows] = await pool.query(query, [brand_name_zh, brand_name_en, id]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Brand with the same name already exists' });
    }

    const [result] = await pool.query(
      'UPDATE Brands SET brand_name_zh = ?, brand_name_en = ?, logo_url = ? WHERE id = ?',
      [brand_name_zh, brand_name_en, logo_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json({ message: 'Brand updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update brand' });
  }
};

// 5. 刪除品牌
exports.deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM Brands WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete brand' });
  }
};
