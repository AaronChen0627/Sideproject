require('dotenv').config();
const mysql = require('mysql2');

// 使用環境變數來配置資料庫連接
const pool = mysql.createPool({
  host: process.env.DB_HOST,                // 從 .env 讀取
  user: process.env.DB_USER,                // 從 .env 讀取
  password: process.env.DB_PASSWORD,        // 從 .env 讀取
  database: process.env.DB_DATABASE,        // 從 .env 讀取
  waitForConnections: true,
});

// 使用 Promise 版本的 pool
const promisePool = pool.promise();

module.exports = promisePool;
