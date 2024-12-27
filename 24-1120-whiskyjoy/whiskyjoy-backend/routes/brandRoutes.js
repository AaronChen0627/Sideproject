const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

// 創建品牌
router.post('/', brandController.createBrand);

// 獲取所有品牌
router.get('/', brandController.getAllBrands);

// 獲取單個品牌
router.get('/:id', brandController.getBrandById);

// 更新品牌
router.put('/:id', brandController.updateBrand);

// 刪除品牌
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
