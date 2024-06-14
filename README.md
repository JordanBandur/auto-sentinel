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
## Backend Scripts
### DTC Scraper
1. Run the scraper script: This script will scrape Diagnostic Trouble Code (DTC) data from obd-codes.com and save it to dtcData.json.
    ```bash
    npm run scrape-dtc
### Import DTC
1. Ensure that the dtcData.json file generated by the scraper.
2. Run the import script to load the DTC data into your database:
    ```bash
    npm run import-dtc
### Database Reset
1. Run the database reset script:
    ```bash
    npm run db:reset
### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. Start the `frontend` server:
   make sure you are using node 18 or higher.
   ```bash
   nvm use 18
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
- **axios**: Promise-based HTTP client for making API requests
- **cli-progress**: A simple and easy to use progress bar for command-line/terminal applications
- **sanitize-html**: Library for sanitizing HTML
- **html-entities**: Library for decoding and encoding HTML entities

### Frontend
- **react**: Library for building user interfaces
- **react-dom**: React package for working with the DOM
- **react-router-dom**: Library for routing in React applications
- **axios**: Promise-based HTTP client for making API requests
- **sass**: preprocessor that is compiled into Cascading Style Sheets.
- **vite**: Next generation frontend tooling
- **@mui/material**: React components for faster and easier web development
- **@emotion/react**: Library designed for writing css styles with JavaScript
- **@emotion/styled**: Styled component library for writing actual css code to style components
- **@mui/icons-material**: Material-UI icons for faster and easier web development

### Dev
- **nodemon**: Utility to automatically restart the server on file changes