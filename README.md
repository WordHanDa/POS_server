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

服務器將在 http://localhost:3002 上運行。

## API 端點

### 用戶管理
- `GET /USER` - 獲取所有用戶
- `POST /createUser` - 建立新用戶
- `PUT /updateUser` - 更新用戶
- `DELETE /deleteUser` - 刪除用戶

### 群組管理
- `GET /GROUP` - 獲取所有群組
- `POST /createGroup` - 建立新群組
- `PUT /updateGroup` - 更新群組
- `PUT /updateGroupSettle` - 更新群組結算狀態
- `DELETE /deleteGroup` - 刪除群組
- `DELETE /api/groups/:groupId` - 刪除指定群組

### 群組成員管理
- `POST /addGroupUser` - 添加用戶到群組
- `DELETE /removeGroupUser` - 從群組移除用戶
- `GET /getUsersByGroupId` - 獲取群組內所有用戶

### 帳單管理
- `POST /createBill` - 建立新帳單
- `PUT /updateBill` - 更新帳單
- `DELETE /deleteBill` - 刪除帳單
- `GET /getBillsByGroupId` - 獲取群組內所有帳單
- `GET /getBillDetails` - 獲取帳單詳情

### 項目管理
- `POST /createItem` - 建立帳單項目
- `PUT /updateItem` - 更新帳單項目
- `GET /getItems` - 獲取帳單項目

### 分割記錄
- `POST /createSplitRecord` - 建立分割記錄
- `PUT /updateSplitRecord` - 更新分割記錄
- `GET /getSplitRecord` - 獲取分割記錄
- `GET /getSplitRecords` - 獲取分割記錄（複數）

### 匯率管理
- `GET /RATE` - 獲取最新匯率
- `GET /YOUR_RATE` - 獲取用戶個人匯率
- `GET /YOUR_RATE/latest` - 獲取群組內最新匯率
- `GET /YOUR_RATE/user` - 獲取指定用戶的匯率
- `PUT /updateRate` - 更新匯率
- `POST /createRate` - 建立新匯率

### 統計計算
- `GET /getGroupTotals` - 獲取群組總計
- `GET /total_advance` - 獲取用戶預付總額
- `GET /total_cost` - 獲取用戶應付總額
- `GET /group_balance` - 獲取群組餘額

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