// 專案根目錄的 index.js
const app = require('./api/index.js');

// 直接匯出 Express app，不要用任何 serverless 套件包裝！
module.exports = app;