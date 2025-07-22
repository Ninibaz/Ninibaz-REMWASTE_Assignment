const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');

// Test user data
let testUser;
let testToken;
let testItemId;

// Setup and teardown
beforeAll(async () => {
  // Connect to a test database
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app-test';
  await mongoose.connect(mongoUri);

  // Create a test user
  testUser = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });

  // Generate token for the test user
  testToken = jwt.sign(
    { userId: testUser._id },
    process.env.JWT_SECRET || 'test-jwt-secret',
    { expiresIn: '7d' }
  );
});

afterAll(async () => {
  // Clean up and close connection
  await User.deleteMany({});
  await Item.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clean up items before each test
  await Item.deleteMany({});

  // Create a test item
  const testItem = await Item.create({
    text: 'Test Todo Item',
    completed: false,
    user: testUser._id
  });

  testItemId = testItem._id;
});

describe('Items Routes', () => {
  describe('GET /api/items', () => {
    it('should get all items for the authenticated user', async () => {
      const res = await request(app)
        .get('/api/items')
        .set('Authorization', `Bearer ${testToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty('text', 'Test Todo Item');
    });

    it('should not get items without authentication', async () => {
      const res = await request(app).get('/api/items');

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });
  });

  describe('POST /api/items', () => {
    it('should create a new item', async () => {
      const res = await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${testToken}`)
        .send({
          text: 'New Todo Item',
          completed: false
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('text', 'New Todo Item');
      expect(res.body).toHaveProperty('completed', false);
      expect(res.body).toHaveProperty('user', testUser._id.toString());
    });

    it('should not create an item with empty text', async () => {
      const res = await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${testToken}`)
        .send({
          text: '',
          completed: false
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should not create an item without authentication', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({
          text: 'New Todo Item',
          completed: false
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });
  });

  describe('GET /api/items/:id', () => {
    it('should get an item by ID', async () => {
      const res = await request(app)
        .get(`/api/items/${testItemId}`)
        .set('Authorization', `Bearer ${testToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('text', 'Test Todo Item');
      expect(res.body).toHaveProperty('_id', testItemId.toString());
    });

    it('should not get an item with invalid ID', async () => {
      const res = await request(app)
        .get('/api/items/60d21b4667d0d8992e610c85')
        .set('Authorization', `Bearer ${testToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Item not found');
    });

    it('should not get an item without authentication', async () => {
      const res = await request(app).get(`/api/items/${testItemId}`);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });
  });

  describe('PUT /api/items/:id', () => {
    it('should update an item', async () => {
      const res = await request(app)
        .put(`/api/items/${testItemId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send({
          text: 'Updated Todo Item',
          completed: true
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('text', 'Updated Todo Item');
      expect(res.body).toHaveProperty('completed', true);
      expect(res.body).toHaveProperty('_id', testItemId.toString());
    });

    it('should not update an item with invalid ID', async () => {
      const res = await request(app)
        .put('/api/items/60d21b4667d0d8992e610c85')
        .set('Authorization', `Bearer ${testToken}`)
        .send({
          text: 'Updated Todo Item',
          completed: true
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Item not found');
    });

    it('should not update an item without authentication', async () => {
      const res = await request(app)
        .put(`/api/items/${testItemId}`)
        .send({
          text: 'Updated Todo Item',
          completed: true
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });
  });

  describe('DELETE /api/items/:id', () => {
    it('should delete an item', async () => {
      const res = await request(app)
        .delete(`/api/items/${testItemId}`)
        .set('Authorization', `Bearer ${testToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Item removed');

      // Verify the item is deleted
      const item = await Item.findById(testItemId);
      expect(item).toBeNull();
    });

    it('should not delete an item with invalid ID', async () => {
      const res = await request(app)
        .delete('/api/items/60d21b4667d0d8992e610c85')
        .set('Authorization', `Bearer ${testToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Item not found');
    });

    it('should not delete an item without authentication', async () => {
      const res = await request(app)
        .delete(`/api/items/${testItemId}`);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });
  });
});