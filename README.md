# Auto Sentinel

Auto Sentinel is a web application designed to help vehicle owners manage and monitor their car maintenance needs efficiently. The app leverages OBD-II data to provide real-time insights into the vehicle's health, track maintenance tasks, and send timely reminders for upcoming services.

## Features
- User Authentication
- Vehicle Management
- Maintenance Tracking
- Service Reminders
- Notifications

## Tech Stack
- **Backend**: Node.js, Express, PostgreSQL, Sequelize
- **Frontend**: React, Vite, Axios, React Router

## Setup

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file with the following variables:
   ```plaintext
   PORT=5000
   DB_NAME=auto_sentinel_db
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
4. Start the `backend` server:
   ```bash
   npm start

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Start the `frontend` server:
   ```bash
   npm run dev

## Dependencies

### Backend
- **express**: Web framework for Node.js
- **sequelize**: ORM for Node.js supporting SQL databases
- **pg**: PostgreSQL client for Node.js
- **pg-hstore**: A module for serializing and deserializing JSON data in PostgreSQL
- **body-parser**: Middleware to parse incoming request bodies
- **dotenv**: Module to load environment variables from a .env file
- **cors**: Middleware to enable Cross-Origin Resource Sharing
- **bcrypt**: Library to hash passwords
- **jsonwebtoken**: Library to generate and verify JSON Web Tokens

### Frontend
- **react**: Library for building user interfaces
- **react-dom**: React package for working with the DOM
- **react-router-dom**: Library for routing in React applications
- **axios**: Promise-based HTTP client for making API requests

### Dev
- **nodemon**: Utility to automatically restart the server on file changes