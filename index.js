const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.database,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 5,
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
    const { seatName } = req.body;
    const sql = "INSERT INTO `SEAT` (SEAT_NAME) VALUES (?)";

    db.query(sql, [seatName], (err, results) => {
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
    const { seatName } = req.body;
    const sql = "UPDATE `SEAT` SET SEAT_NAME = ? WHERE SEAT_ID = ?";

    db.query(sql, [seatName, id], (err, results) => {
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
    const sql = "SELECT * FROM `ORDER` ORDER BY ORDER_DATE DESC";
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

// 2. 取得特定訂單 (by ID)
app.get('/ORDER/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `ORDER` WHERE ORDER_ID = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.json(results[0]);
        }
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
    // 使用 COALESCE 確保若無明細時總額為 0 而非 NULL
    const sql = `
        UPDATE \`ORDER\` 
        SET ORDER_MOUNT = (
            SELECT COALESCE(SUM(PRICE_AT_SALE * QUANTITY * (SALE_IN_PERCENT / 100)), 0)
            FROM ORDER_DETAIL 
            WHERE ORDER_ID = ?
        )
        WHERE ORDER_ID = ?`;

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
            o.ORDER_ID, o.SEAT_ID, o.ORDER_DATE, o.NOTE AS ORDER_NOTE, o.SEND AS ORDER_SEND,
            od.DETAIL_ID, od.QUANTITY, od.SEND AS ITEM_SEND,
            i.ITEM_NAME, i.Type, s.SEAT_NAME
        FROM \`ORDER\` o
        JOIN ORDER_DETAIL od ON o.ORDER_ID = od.ORDER_ID
        JOIN ITEM i ON od.ITEM_ID = i.ITEM_ID
        JOIN SEAT s ON o.SEAT_ID = s.SEAT_ID
        WHERE DATE(o.ORDER_DATE) = ?
        ORDER BY 
            od.SEND ASC,
            o.ORDER_DATE ASC, 
            od.DETAIL_ID ASC`;

    db.query(sql, [date], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

if (require.main === module) {
    app.listen(3002, () => {
        console.log('OK, server is running on port 3002');
    });
}

module.exports = app;