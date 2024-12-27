const productModel = require("../models/productModel");

module.exports = {
  // 取得所有產品
  getAllProducts: async (req, res) => {
    try {
      const products = await productModel.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching products", error });
    }
  },

  // 刪除產品
deleteProduct: async (req, res) => {
    const { id } = req.params;
    const product = await productModel.getProductById(id);
  
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  
    await productModel.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });

  },

  // 新增產品
  createProduct: async (req, res) => {
    try {
      const { product_name_zh, product_name_en, product_image_url, country_id, region_id, category_id, brand_id } = req.body;

      // 檢查是否有重複名稱
      const existingProduct = await productModel.findProductByName(product_name_zh, product_name_en);
      if (existingProduct.length > 0) {
        return res.status(400).json({ message: "產品名稱中文或英文已存在" });
      }

      // 找出相關 ID
      const countryId = await productModel.findIdByName("Countries", "country_name_zh", country_id);
      const regionId = region_id ? await productModel.findIdByName("Regions", "region_name_zh", region_id) : null;
      const categoryId = await productModel.findIdByName("Categories", "category_name_zh", category_id);
      const brandId = await productModel.findIdByName("Brands", "brand_name_zh", brand_id);

      if (!countryId || !categoryId || !brandId) {
        return res.status(400).json({ message: "無效的 country_id, category_id 或 brand_id" });
      }

      // 插入產品
      await productModel.insertProduct({
        product_name_zh,
        product_name_en,
        product_image_url,
        country_id: countryId,
        region_id: regionId,
        category_id: categoryId,
        brand_id: brandId,
      });

      res.status(201).json({ message: "產品新增成功" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "伺服器錯誤", error });
    }
  },

  // 更新產品
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { product_name_zh, product_name_en, product_image_url, country_id, region_id, category_id, brand_id } = req.body;

      // 找出相關 ID
      const countryId = await productModel.findIdByName("Countries", "country_name_zh", country_id);
      const regionId = region_id ? await productModel.findIdByName("Regions", "region_name_zh", region_id) : null;
      const categoryId = await productModel.findIdByName("Categories", "category_name_zh", category_id);
      const brandId = await productModel.findIdByName("Brands", "brand_name_zh", brand_id);

      if (!countryId || !categoryId || !brandId) {
        return res.status(400).json({ message: "無效的 country_id, category_id 或 brand_id" });
      }

      // 更新產品
      await productModel.updateProduct(id, {
        product_name_zh,
        product_name_en,
        product_image_url,
        country_id: countryId,
        region_id: regionId,
        category_id: categoryId,
        brand_id: brandId,
      });

      res.status(200).json({ message: "產品更新成功" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "伺服器錯誤", error });
    }
  },
   // 根據 ID 獲取單一產品
   getProductById: async (req, res) => {
    try {
      // 從 URL 中取得 id
      const productId = req.params.id;
      
      // 呼叫模型層的方法獲取產品資料
      const product = await productModel.getProductById(productId);
      
      // 如果產品存在，返回產品資料
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching product", error });
    }
  },
};
