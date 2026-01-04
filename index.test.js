const request = require('supertest');
const mysql = require('mysql');

jest.mock('mysql');
jest.mock('dotenv', () => ({ config: jest.fn() }));

const mockDb = {
    query: jest.fn(),
    getConnection: jest.fn((callback) => callback(null, { release: jest.fn() }))
};

mysql.createPool.mockReturnValue(mockDb);

const app = require('./index');

describe('ITEM API', () => {
    beforeEach(() => {
        mockDb.query.mockClear();
        mockDb.getConnection.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /ITEM', () => {
        it('should return all items', async () => {
            const mockResults = [{ item_id: 1, name: 'Item1', price: 10, description: 'Desc1' }];
            mockDb.query.mockImplementation((query, callback) => {
                callback(null, mockResults);
            });

            const response = await request(app).get('/ITEM');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResults);
            expect(mockDb.query).toHaveBeenCalledWith("SELECT * FROM `ITEM`", expect.any(Function));
        });

        it('should return 500 on database error', async () => {
            mockDb.query.mockImplementation((query, callback) => {
                callback(new Error('DB Error'), null);
            });

            const response = await request(app).get('/ITEM');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: {} });
        });
    });

    describe('GET /ITEM/:id', () => {
        it('should return a specific item', async () => {
            const mockResults = [{ item_id: 1, name: 'Item1', price: 10, description: 'Desc1' }];
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const response = await request(app).get('/ITEM/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResults[0]);
            expect(mockDb.query).toHaveBeenCalledWith("SELECT * FROM `ITEM` WHERE ITEM_ID = ?", ["1"], expect.any(Function));
        });

        it('should return 404 if item not found', async () => {
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(null, []);
            });

            const response = await request(app).get('/ITEM/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Item not found' });
        });

        it('should return 500 on database error', async () => {
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(new Error('DB Error'), null);
            });

            const response = await request(app).get('/ITEM/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: {} });
        });
    });

    describe('POST /ITEM', () => {
        it('should create a new item', async () => {
            const mockResults = { insertId: 1 };
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const newItem = { name: 'New Item', price: 20, description: 'New Desc' };
            const response = await request(app).post('/ITEM').send(newItem);

            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'Item created', ITEM_ID: 1 });
            expect(mockDb.query).toHaveBeenCalledWith("INSERT INTO `ITEM` (ITEM_NAME, ITEM_PRICE, Description) VALUES (?, ?, ?)", [newItem.name, newItem.price, newItem.description], expect.any(Function));
        });

        it('should return 500 on database error', async () => {
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(new Error('DB Error'), null);
            });

            const newItem = { name: 'New Item', price: 20, description: 'New Desc' };
            const response = await request(app).post('/ITEM').send(newItem);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: {} });
        });
    });

    describe('PUT /ITEM/:id', () => {
        it('should update an item', async () => {
            const mockResults = { affectedRows: 1 };
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const updatedItem = { name: 'Updated Item', price: 30, description: 'Updated Desc' };
            const response = await request(app).put('/ITEM/1').send(updatedItem);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Item updated' });
            expect(mockDb.query).toHaveBeenCalledWith("UPDATE `ITEM` SET ITEM_NAME = ?, ITEM_PRICE = ?, Description = ? WHERE ITEM_ID = ?", [updatedItem.name, updatedItem.price, updatedItem.description, '1'], expect.any(Function));
        });

        it('should return 404 if item not found', async () => {
            const mockResults = { affectedRows: 0 };
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const updatedItem = { name: 'Updated Item', price: 30, description: 'Updated Desc' };
            const response = await request(app).put('/ITEM/1').send(updatedItem);

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Item not found' });
        });

        it('should return 500 on database error', async () => {
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(new Error('DB Error'), null);
            });

            const updatedItem = { name: 'Updated Item', price: 30, description: 'Updated Desc' };
            const response = await request(app).put('/ITEM/1').send(updatedItem);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: {} });
        });
    });

    describe('DELETE /ITEM/:id', () => {
        it('should delete an item', async () => {
            const mockResults = { affectedRows: 1 };
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const response = await request(app).delete('/ITEM/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Item deleted' });
            expect(mockDb.query).toHaveBeenCalledWith("DELETE FROM `ITEM` WHERE ITEM_ID = ?", ['1'], expect.any(Function));
        });

        it('should return 404 if item not found', async () => {
            const mockResults = { affectedRows: 0 };
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(null, mockResults);
            });

            const response = await request(app).delete('/ITEM/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Item not found' });
        });

        it('should return 500 on database error', async () => {
            mockDb.query.mockImplementation((query, params, callback) => {
                callback(new Error('DB Error'), null);
            });

            const response = await request(app).delete('/ITEM/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: {} });
        });
    });
});