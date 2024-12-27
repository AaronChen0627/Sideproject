require('dotenv').config();  // 這行會加載 .env 文件中的環境變數

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const brandsRouter = require('./routes/brandRoutes');  // 引入品牌路由
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes= require('./routes/commentRoutes');

app.use(cors());
app.use(bodyParser.json());  // 使用 JSON 解析請求
app.use(express.urlencoded({ extended: true }));  // 用于解析 URL 编码的表单数据


// 路由
app.use('/api/brands', brandsRouter);
app.use('/api/products', productRoutes);
app.use('/api', authRoutes);
app.use('/api/comments',commentRoutes);




// 測試 API
app.get('/', (req, res) => {
  res.send('妳好，香吟老師');
});


module.exports = app;
