const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

const AllowOrigin = [
    'https://pos-manage.vercel.app',
    'https://posfront-psi.vercel.app',
    'http://localhost:3000'
];

const db = mysql.createPool({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.database,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database Pool connection failed:', err);
    } else {
        console.log('Connected to MySQL pool successfully');
        connection.release();
    }
});
app.use(cors({
    origin: function (origin, callback) {
        // 允許沒有 origin 的請求（例如 Postman 或 curl）
        if (!origin) return callback(null, true);
        if (AllowOrigin.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
        credentials: true
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // 如果你有用到 Cookie 或 Authorization Header
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// 1. Get all items
app.get('/ITEM', (req, res) => {
    db.query("SELECT * FROM `ITEM`", (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});
app.get('/ITEM_BY_TYPE', (req, res) => {
    const { type } = req.query; // 從查詢參數獲取 type，例如 /ITEM?type=aaa
    db.query("SELECT * FROM `ITEM` WHERE Type = ?", [type], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    })
});

// 2. Get a specific item by ID
app.get('/ITEM/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `ITEM` WHERE ITEM_ID = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// 3. Create a new item (已新增 Picture_URL 與 Type)
app.post('/ITEM', (req, res) => {
    // 從 body 解析新欄位
    const { name, price, description, pictureUrl, type } = req.body;
    const sql = "INSERT INTO `ITEM` (ITEM_NAME, ITEM_PRICE, Description, PICTURE_URL, Type) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [name, price, description, pictureUrl, type], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Item created', ITEM_ID: results.insertId });
        }
    });
});

// 4. Update an item by ID (已新增 Picture_URL 與 Type)
app.put('/ITEM/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description, pictureUrl, type } = req.body;
    const sql = "UPDATE `ITEM` SET ITEM_NAME = ?, ITEM_PRICE = ?, Description = ?, PICTURE_URL = ?, Type = ? WHERE ITEM_ID = ?";

    db.query(sql, [name, price, description, pictureUrl, type, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json({ message: 'Item updated' });
        }
    });
});

// 5. Delete an item by ID
app.delete('/ITEM/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM `ITEM` WHERE ITEM_ID = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json({ message: 'Item deleted' });
        }
    });
});

//SEAT---------------------------------------------------------------------------
// --- SEAT CRUD Operations ---

// 1. Get all seats
app.get('/SEAT', (req, res) => {
    db.query("SELECT * FROM `SEAT`", (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

app.get('/SEAT_STATUS', (req, res) => {
    const sql = `
        SELECT 
            S.SEAT_ID, 
            S.SEAT_NAME, 
            S.POSITION_X, 
            S.POSITION_Y,
            COUNT(O.ORDER_ID) AS active_orders,
            SUM(CASE WHEN O.settle = 0 THEN O.ORDER_MOUNT ELSE 0 END) AS current_total
        FROM \`SEAT\` S
        LEFT JOIN \`ORDER\` O ON S.SEAT_ID = O.SEAT_ID AND (O.settle = 0)
        GROUP BY S.SEAT_ID
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// 2. Get a specific seat by ID
app.get('/SEAT/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `SEAT` WHERE SEAT_ID = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Seat not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// 3. Create a new seat
app.post('/SEAT', (req, res) => {
    // 接收前端傳來的 seatName, x, y
    const { seatName, x, y } = req.body;
    const sql = "INSERT INTO `SEAT` (SEAT_NAME, POSITION_X, POSITION_Y) VALUES (?, ?, ?)";

    db.query(sql, [seatName, x || 0, y || 0], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({
                message: 'Seat created',
                SEAT_ID: results.insertId
            });
        }
    });
});

// 4. Update a seat by ID
app.put('/SEAT/:id', (req, res) => {
    const { id } = req.params;
    const { seatName, x, y } = req.body;

    // 更新名稱以及 X, Y 座標
    const sql = "UPDATE `SEAT` SET SEAT_NAME = ?, POSITION_X = ?, POSITION_Y = ? WHERE SEAT_ID = ?";

    db.query(sql, [seatName, x, y, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Seat not found' });
        } else {
            res.json({ message: 'Seat updated' });
        }
    });
});

// 5. Delete a seat by ID
app.delete('/SEAT/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM `SEAT` WHERE SEAT_ID = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Seat not found' });
        } else {
            res.json({ message: 'Seat deleted' });
        }
    });
});

//ORDER-----------------------------------------------------------------------------
// 1. 取得所有訂單 (通常會依日期排序，顯示最新的訂單)
app.get('/ORDER', (req, res) => {
    // 使用 JOIN 結合兩張表，並選取所需的欄位
    const sql = `
        SELECT 
            O.*, 
            S.SEAT_NAME 
        FROM \`ORDER\` AS O
        LEFT JOIN \`SEAT\` AS S ON O.SEAT_ID = S.SEAT_ID
        ORDER BY O.ORDER_DATE DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("SQL Error: ", err); // 在伺服器端印出詳細錯誤方便排錯
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
});

// 2. 取得特定訂單 (by ID)
// 修正後的更新訂單 API
app.put('/ORDER/:id', (req, res) => {
    const { id } = req.params;
    const { seatId, note, discount } = req.body; 

    // 步驟 1: 先更新折扣、備註與座位資訊
    const updateInfoSql = "UPDATE `ORDER` SET SEAT_ID = ?, NOTE = ?, DISCOUNT = ? WHERE ORDER_ID = ?";

    db.query(updateInfoSql, [seatId, note, discount || 0, id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });

        // 步驟 2: 折扣更新成功後，立即呼叫輔助函式重新計算 ORDER_MOUNT 並寫入資料庫
        // 這能確保資料庫內的 ORDER_MOUNT 永遠等於 (品項小計 - 最新折扣)
        updateOrderTotal(id);

        res.json({ message: 'Order updated and mount recalculated' });
    });
});

// 3. 新增訂單
app.post('/ORDER', (req, res) => {
    const { seatId, mount, note } = req.body;
    // ORDER_DATE 會自動使用 current_timestamp()，不需手動傳入
    const sql = "INSERT INTO `ORDER` (SEAT_ID, ORDER_MOUNT, NOTE) VALUES (?, ?, ?)";

    db.query(sql, [seatId, mount, note], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({
                message: 'Order created',
                ORDER_ID: results.insertId
            });
        }
    });
});

// 4. 更新訂單內容
app.put('/ORDER/:id', (req, res) => {
    const { id } = req.params;
    const { seatId, mount, note } = req.body;
    const sql = "UPDATE `ORDER` SET SEAT_ID = ?, ORDER_MOUNT = ?, NOTE = ? WHERE ORDER_ID = ?";

    db.query(sql, [seatId, mount, note, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json({ message: 'Order updated' });
        }
    });
});

app.put('/ORDER/settle/:id', (req, res) => {
    const { id } = req.params;
    // 將 settle 欄位設為 1
    const sql = "UPDATE `ORDER` SET settle = 1 WHERE ORDER_ID = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json({ message: 'Order settled successfully' });
        }
    });
});

// 5. 刪除訂單
app.delete('/ORDER/:id', (req, res) => {
    const { id } = req.params;
    // 先刪除該訂單下所有明細
    db.query("DELETE FROM ORDER_DETAIL WHERE ORDER_ID = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err });

        // 再刪除主訂單
        db.query("DELETE FROM `ORDER` WHERE ORDER_ID = ?", [id], (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Order and its details deleted' });
        });
    });
});

// 輔助函式：更新訂單總額
const updateOrderTotal = (orderId) => {
    // 邏輯：重新抓取所有明細加總，並減去最新的 DISCOUNT
    const sql = `
        UPDATE \`ORDER\` o
        SET o.ORDER_MOUNT = (
            SELECT COALESCE(SUM(od.PRICE_AT_SALE * od.QUANTITY * (od.SALE_IN_PERCENT / 100)), 0)
            FROM ORDER_DETAIL od
            WHERE od.ORDER_ID = ?
        ) - COALESCE(o.DISCOUNT, 0)
        WHERE o.ORDER_ID = ?`;

    db.query(sql, [orderId, orderId], (err) => {
        if (err) console.error("更新訂單總額失敗:", err);
    });
};

// 修改新增明細 API
app.post('/ORDER_DETAIL', (req, res) => {
    const { orderId, itemId, quantity, priceAtSale, saleInPercent } = req.body;
    const sql = "INSERT INTO ORDER_DETAIL (ORDER_ID, ITEM_ID, QUANTITY, PRICE_AT_SALE, SALE_IN_PERCENT) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [orderId, itemId, quantity, priceAtSale, saleInPercent], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        // 新增成功後，觸發計算總額
        updateOrderTotal(orderId);
        res.status(201).json({ message: '明細已新增', DETAIL_ID: results.insertId });
    });
});

// 修改刪除明細 API
app.delete('/ORDER_DETAIL/:id', (req, res) => {
    const { id } = req.params;
    // 先查出該明細屬於哪個 orderId，刪除後才能更新
    db.query("SELECT ORDER_ID FROM ORDER_DETAIL WHERE DETAIL_ID = ?", [id], (err, results) => {
        if (results.length > 0) {
            const orderId = results[0].ORDER_ID;
            db.query("DELETE FROM ORDER_DETAIL WHERE DETAIL_ID = ?", [id], (err) => {
                if (err) return res.status(500).json({ error: err });

                // 刪除成功後，觸發計算總額
                updateOrderTotal(orderId);
                res.json({ message: '明細已刪除' });
            });
        }
    });
});

//訂單細節--------------------------------------------------
// 1. 取得特定訂單的所有細節
app.get('/ORDER_DETAIL/:orderId', (req, res) => {
    const { orderId } = req.params;
    const sql = `
        SELECT od.*, i.ITEM_NAME 
        FROM ORDER_DETAIL od
        JOIN ITEM i ON od.ITEM_ID = i.ITEM_ID
        WHERE od.ORDER_ID = ?`;
    db.query(sql, [orderId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// 2. 新增訂單細節
app.post('/ORDER_DETAIL', (req, res) => {
    const { orderId, itemId, quantity, priceAtSale, saleInPercent } = req.body;
    const sql = "INSERT INTO ORDER_DETAIL (ORDER_ID, ITEM_ID, QUANTITY, PRICE_AT_SALE, SALE_IN_PERCENT) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [orderId, itemId, quantity, priceAtSale, saleInPercent || 100], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Detail added', DETAIL_ID: results.insertId });
    });
});

// 3. 刪除細節
app.delete('/ORDER_DETAIL/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM ORDER_DETAIL WHERE DETAIL_ID = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Detail deleted' });
    });
});

// --- ORDER_DETAIL 出單功能 ---

// 輔助函式：檢查並更新主訂單的 SEND 狀態
const checkAndSetOrderSend = (orderId) => {
    // 檢查該訂單是否還有任何明細尚未出單 (SEND = 0)
    const checkSql = "SELECT COUNT(*) AS unsentCount FROM ORDER_DETAIL WHERE ORDER_ID = ? AND SEND = 0";

    db.query(checkSql, [orderId], (err, results) => {
        if (err) return console.error("檢查出單狀態失敗:", err);

        // 如果未出單數量為 0，且該訂單至少有一筆明細，則更新主訂單為已出單
        if (results[0].unsentCount === 0) {
            const updateOrderSql = "UPDATE `ORDER` SET SEND = 1 WHERE ORDER_ID = ?";
            db.query(updateOrderSql, [orderId], (err) => {
                if (err) console.error("更新主訂單 SEND 失敗:", err);
            });
        } else {
            // 若還有未出單項目，確保主訂單維持在 0
            const resetOrderSql = "UPDATE `ORDER` SET SEND = 0 WHERE ORDER_ID = ?";
            db.query(resetOrderSql, [orderId]);
        }
    });
};

// 更新明細出單狀態 API
app.put('/ORDER_DETAIL/send/:detailId', (req, res) => {
    const { detailId } = req.params;
    const { sendStatus } = req.body; // 傳入 1 (已出) 或 0 (未出)

    // 1. 先更新明細的 SEND 狀態
    const updateDetailSql = "UPDATE ORDER_DETAIL SET SEND = ? WHERE DETAIL_ID = ?";
    db.query(updateDetailSql, [sendStatus, detailId], (err) => {
        if (err) return res.status(500).json({ error: err });

        // 2. 獲取該明細所屬的 orderId
        db.query("SELECT ORDER_ID FROM ORDER_DETAIL WHERE DETAIL_ID = ?", [detailId], (err, results) => {
            if (results && results.length > 0) {
                const orderId = results[0].ORDER_ID;
                // 3. 執行檢查並更新主訂單狀態
                checkAndSetOrderSend(orderId);
                res.json({ message: '明細出單狀態已更新' });
            } else {
                res.status(404).json({ message: '找不到明細' });
            }
        });
    });
});
// 取得特定日期的所有訂單及其詳細品項
app.get('/REVENUE_DETAILS_BY_DATE', (req, res) => {
    const { date } = req.query;
    const sql = `
        SELECT 
            o.ORDER_ID, 
            o.SEAT_ID, 
            o.ORDER_DATE, 
            o.NOTE AS ORDER_NOTE, 
            o.SEND AS ORDER_SEND,
            o.settle,
            o.DISCOUNT, -- 重要：新增此欄位
            od.DETAIL_ID, 
            od.QUANTITY, 
            od.SEND AS ITEM_SEND,
            i.ITEM_NAME, 
            i.ITEM_PRICE AS PRICE_AT_SALE, 
            i.Type, 
            s.SEAT_NAME
        FROM \`ORDER\` o
        LEFT JOIN ORDER_DETAIL od ON o.ORDER_ID = od.ORDER_ID
        LEFT JOIN ITEM i ON od.ITEM_ID = i.ITEM_ID
        JOIN SEAT s ON o.SEAT_ID = s.SEAT_ID
        WHERE DATE(o.ORDER_DATE) = ?
        ORDER BY 
            od.SEND ASC,
            o.ORDER_DATE ASC, 
            od.DETAIL_ID ASC`;

    db.query(sql, [date], (err, results) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.post('/PLACE_ORDER', (req, res) => {
    const { items, note } = req.body;
    // 獲取桌號並確保其為數字
    const seatId = parseInt(req.query.SEAT_ID, 10) || 1;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: "購物車是空的" });
    }

    db.getConnection((err, connection) => {
        if (err) return res.status(500).json({ error: "資料庫連線獲取失敗" });

        connection.beginTransaction((err) => {
            if (err) { connection.release(); return res.status(500).json({ error: "事務啟動失敗" }); }

            // 1. 插入主訂單
            const orderSql = "INSERT INTO `ORDER` (SEAT_ID, ORDER_MOUNT, NOTE) VALUES (?, ?, ?)";
            connection.query(orderSql, [seatId, 0, note || '-'], (err, orderResult) => {
                if (err) {
                    return connection.rollback(() => { connection.release(); res.status(500).json({ error: "主訂單建立失敗", details: err }); });
                }

                const newOrderId = orderResult.insertId;

                // 2. 準備明細數據 (請確保 ORDER_DETAIL 表有 NOTE 欄位)
                const detailValues = items.map(item => [
                    newOrderId,
                    item.ITEM_ID,
                    item.quantity,
                    item.ITEM_PRICE,
                    100, // SALE_IN_PERCENT 預設 100 代表無折扣
                    item.note || ""
                ]);

                const detailSql = "INSERT INTO ORDER_DETAIL (ORDER_ID, ITEM_ID, QUANTITY, PRICE_AT_SALE, SALE_IN_PERCENT, NOTE) VALUES ?";

                connection.query(detailSql, [detailValues], (err) => {
                    if (err) {
                        return connection.rollback(() => { connection.release(); res.status(500).json({ error: "訂單明細建立失敗", details: err }); });
                    }

                    // 3. 自動更新該訂單的總金額 (ORDER_MOUNT)
                    // 在 PLACE_ORDER 內更新 ORDER_MOUNT 的 SQL
                    // 在 PLACE_ORDER 事務內的 updateMountSql 修改如下：
                    const updateMountSql = `
                        UPDATE \`ORDER\` 
                        SET ORDER_MOUNT = (
                        SELECT COALESCE(SUM(PRICE_AT_SALE * QUANTITY), 0) 
                        FROM ORDER_DETAIL 
                        WHERE ORDER_ID = ?
                        ) - COALESCE(DISCOUNT, 0) 
                        WHERE ORDER_ID = ?`;

                    connection.query(updateMountSql, [newOrderId, newOrderId], (err) => {
                        if (err) {
                            return connection.rollback(() => { connection.release(); res.status(500).json({ error: "總金額更新失敗" }); });
                        }

                        // 4. 提交事務並釋放連線
                        connection.commit((err) => {
                            if (err) return connection.rollback(() => { connection.release(); res.status(500).json({ error: "提交失敗" }); });
                            connection.release();
                            res.status(201).json({
                                message: '訂單建立成功',
                                ORDER_ID: newOrderId,
                                SEAT_ID: seatId
                            });
                        });
                    });
                });
            });
        });
    });
});

app.get('/ITEM_GROUPED', (req, res) => {
    const { type } = req.query;
    // 依名稱排序，確保處理時邏輯一致
    const sql = "SELECT * FROM `ITEM` WHERE Type = ? ORDER BY ITEM_NAME ASC";

    db.query(sql, [type], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        const grouped = {};

        results.forEach(item => {
            // 1. 提取基礎名稱：移除括號內容及 ml 標記 (例如 "KI NO BI (15ml)" -> "KI NO BI")
            const baseName = item.ITEM_NAME.replace(/\s*\(.*?\)/g, '').replace(/\s*\d+ml.*/i, '').trim();

            // 2. 提取 ABV：從 Description 中提取 abv:xx% 數值
            const abvMatch = item.Description ? item.Description.match(/abv[:：\s]*(\d+\.?\d*)\s*%/i) : null;
            const extractedAbv = abvMatch ? abvMatch[1] : null;

            // 3. 清洗 Description：移除 abv 字串避免重複顯示
            const cleanDescription = item.Description
                ? item.Description.replace(/abv[:：\s]*\d+\.?\d*\s*%/i, '').trim()
                : "";

            // 4. 偵測容量 (size)：抓取名稱中的 15ml 或 30ml
            const sizeMatch = item.ITEM_NAME.match(/(\d+\s*ml)/i);
            const sizeLabel = sizeMatch ? sizeMatch[0].replace(/\s+/g, '').toLowerCase() : null;

            if (!grouped[baseName]) {
                grouped[baseName] = {
                    display_name: baseName,
                    description: cleanDescription,
                    picture_url: item.PICTURE_URL,
                    display_abv: extractedAbv,
                    variants: []
                };
            }

            // 5. 插入變體數據
            grouped[baseName].variants.push({
                item_id: item.ITEM_ID,
                price: item.ITEM_PRICE,
                size: sizeLabel,
                original_name: item.ITEM_NAME
            });
        });

        // 6. 排序補償邏輯：確保同一字卡內的價格由低到高，並自動標註缺失的 size
        const finalData = Object.values(grouped).map(group => {
            // 按價格排序
            group.variants.sort((a, b) => a.price - b.price);

            group.variants = group.variants.map((v, idx) => {
                // 如果 Regex 沒抓到容量標籤，則便宜的預設 15ml，貴的預設 30ml
                if (!v.size) {
                    v.size = idx === 0 ? '15ml' : '30ml';
                }
                return v;
            });
            return group;
        });

        res.json(finalData);
    });
});

if (require.main === module) {
    app.listen(3002, () => {
        console.log('OK, server is running on port 3002');
    });
}

module.exports = app;