一個用於管理團體帳單分割的Node.js Express API 服務器。支援用戶管理、群組建立、帳單記錄、費用分割等功能。

## 功能特色

- **用戶管理**：建立、更新、刪除用戶
- **群組管理**：建立群組、添加/移除成員
- **帳單管理**：記錄帳單、支援不同分割方式（百分比或項目）
- **費用計算**：自動計算群組內每位用戶的應付/應收金額
- **匯率支援**：支援日圓/新台幣匯率轉換
- **資料庫整合**：使用MySQL儲存資料

## 安裝

1. 複製專案：
   ```bash
   git clone <repository-url>
   cd split_server
   ```

2. 安裝依賴：
   ```bash
   npm install
   ```

3. 設定環境變數：
   建立 `.env` 檔案並設定以下變數：
   ```
   dbhost=your_mysql_host
   dbuser=your_mysql_username
   dbpassword=your_mysql_password
   ```

4. 確保MySQL資料庫已建立並包含以下表格：
   - USER
   - GROUP_TABLE
   - GROUP_USER
   - BILL_RECORD
   - SPLIT_RECORD
   - ITEM_DETAIL
   - RATE
   - YOUR_RATE

## 使用

### 開發模式
```bash
npm run dev
```

### 生產模式
```bash
npm start
```

### 測試
```bash
npm test
```

服務器將在 http://localhost:3002 上運行。

## API 端點

### 項目管理 (ITEM)
- `GET /ITEM` - 獲取所有項目
- `GET /ITEM/:id` - 獲取指定項目
- `POST /ITEM` - 建立新項目
- `PUT /ITEM/:id` - 更新項目
- `DELETE /ITEM/:id` - 刪除項目

## 測試

專案包含完整的API測試，使用Jest和Supertest進行端點測試。測試模擬資料庫操作，確保API行為正確。

運行測試：
```bash
npm test
```

## 環境變數

| 變數名稱 | 描述 | 預設值 |
|----------|------|--------|
| `dbhost` | MySQL 主機地址 | 必填 |
| `dbuser` | MySQL 用戶名 | 必填 |
| `dbpassword` | MySQL 密碼 | 必填 |

## 部署

此專案支援Vercel部署。請參考 vercel.json 設定檔案。

## 技術棧

- **後端框架**：Express.js
- **資料庫**：MySQL
- **其他依賴**：CORS, dotenv, axios
- **部署平台**：Vercel