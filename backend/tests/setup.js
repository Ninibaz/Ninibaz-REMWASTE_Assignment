// Set up environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.MONGO_URI = 'mongodb://localhost:27017/todo-app-test';

// Mock console.error to avoid cluttering test output
console.error = jest.fn();

// Mock console.log to avoid cluttering test output
console.log = jest.fn();