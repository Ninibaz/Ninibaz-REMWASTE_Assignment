const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

// Setup and teardown
beforeAll(async () => {
  // Connect to a test database
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app-test';
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // Clean up and close connection
  await User.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clean up users before each test
  await User.deleteMany({});
});

describe('Auth Routes', () => {
  describe('POST /api/register', () => {
    it('should register a new user and return token', async () => {
      const res = await request(app)
        .post('/api/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
      expect(res.body.user).toHaveProperty('name', 'Test User');
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('should not register a user with an existing email', async () => {
      // Create a user first
      await User.create({
        name: 'Existing User',
        email: 'test@example.com',
        password: 'password123'
      });

      // Try to register with the same email
      const res = await request(app)
        .post('/api/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /api/login', () => {
    it('should login user and return token', async () => {
      // Create a user first
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      // Login with the user
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should not login with invalid credentials', async () => {
      // Create a user first
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      // Try to login with wrong password
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should not login with non-existent email', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
  });

  describe('GET /api/me', () => {
    it('should get current user profile', async () => {
      // Create a user and get token
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const loginRes = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      const token = loginRes.body.token;

      // Get user profile with token
      const res = await request(app)
        .get('/api/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('email', 'test@example.com');
      expect(res.body).toHaveProperty('name', 'Test User');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should not get profile without token', async () => {
      const res = await request(app).get('/api/me');

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'No token, authorization denied');
    });

    it('should not get profile with invalid token', async () => {
      const res = await request(app)
        .get('/api/me')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Token is not valid');
    });
  });
});