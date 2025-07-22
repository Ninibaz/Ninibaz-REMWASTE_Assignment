# Todo Application

A full-stack Todo application with React frontend and Node.js/Express backend.

## Features

- User authentication (login/register)
- Create, read, update, and delete todo items
- Mark todos as complete/incomplete
- Responsive design

## Tech Stack

### Frontend
- React
- React Router for navigation
- Axios for API requests
- Cypress for end-to-end testing

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Jest for unit testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

```bash
git clone https://github.com/Ninibaz/Ninibaz-REMWASTE_Assignment.git
```

2. Install dependencies for both frontend and backend

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables

Copy the `.env.example` files in both backend and frontend directories to create your own `.env` files:

```bash
# For backend
cd backend
cp .env.example .env

# For frontend
cd ../frontend
cp .env.example .env
```

Then edit the `.env` files to customize your environment variables as needed:

**Backend `.env`:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**Frontend `.env`:**
```
REACT_APP_API_URL=http://localhost:5000/api
PORT=3000
BROWSER=none
GENERATE_SOURCEMAP=false

# Cypress Testing
CYPRESS_BASE_URL=http://localhost:3000
```

The frontend uses environment variables for API URLs in both the application and Cypress tests.

### Running the Application

1. Start the backend server

```bash
cd backend
npm run dev
```

2. Start the frontend development server

```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Testing

Refer to the [test plan](docs/test_plan.md) for detailed information about testing strategies.

### Running Tests

#### Frontend Tests

```bash
cd frontend
npm run cypress:open  # For interactive mode
npm run cypress:run   # For headless mode
```

#### Backend Tests

```bash
cd backend
npm test                # Run all tests
npm run test:coverage   # Run tests with coverage report
npm run test:watch      # Run tests in watch mode
```

#### API Tests with Postman/Newman

```bash
cd backend
newman run tests/Todo_API.postman_collection.json --environment tests/local.postman_environment.json
```

See the [backend tests README](backend/tests/README.md) for more details.

## CI/CD

This project uses GitHub Actions for continuous integration and deployment. The workflow is defined in `.github/workflows/main.yml`.

## License

This project is licensed under the MIT License.