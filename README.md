# Auto Sentinel

Auto Sentinel is a web application designed to help vehicle owners manage and monitor their car maintenance needs. The app leverages OBD-II data to provide real-time insights into the vehicle's health, track maintenance tasks, and send timely reminders for upcoming services. The App currently simulates the OBD sensor.

## Features
- User Authentication
- Vehicle Management
- Maintenance Tracking
- Service Reminders
- Notifications

## Tech Stack
### **Backend**: 
- Node.js
- Express
- PostgreSQL (pg)
- Sequelize
- bcrypt
- jsonwebtoken
- Multer
- Nodemailer
- Twilio
- Puppeteer
- Obd-parser
- Sanitize-html
- dotenv
- cors
- body-parser
- axios
- cli-progress
- Nodemon
- Sequelize CLI
### **Frontend**: 
- Vite
- React
- React DOM
- Sass
- Emotion
- MUI (Material-UI)
- Notistack
- Axios
- Chart.js
- React-Chartjs-2
- React Router DOM
- ESLint

## Screenshots
### Dashboard
![Dashboard](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-1.png)

![Dashboard 2](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-2.png)

![Dashboard OBD Connected 1](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-obd-connect-1.png)

![Dashboard OBD Connected 2](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-obd-connect-2.png)

![Dashboard OBD Advanced View 1](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-obd-connect-adv-1.png)

![Dashboard OBD Advanced View 2](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-obd-connect-adv-2.png)

![Dashboard OBD Save Snaphot](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-obd-connect-adv-2-save.png)

![Dashboard Performance View 1](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-perf-1.png)

![Dashboard Performance View 2](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-perf-2.png)

![Dashboard Historic Data View 1](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-history-1.png)

![Dashboard Historic Data View Modal info](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-history-modal.png)

![Dashboard Historic Data View Send Modal](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-history-modal-send.png)

![Dashboard Maintenance View](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/dash-maint.png)

### Vehicle Management
![Vehicle Management 1](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/vehicle-management-1.png)

![Vehicle Management 2](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/vehicle-management-2.png)

![Vehicle Management 3](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/vehicle-management-3.png)

![Vehicle Management 4](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/vehicle-management-4.png)

![Vehicle Management 5](https://github.com/JordanBandur/auto-sentinel/blob/main/frontend/src/assets/screenshots/vehicle-management-5.png)

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
- **multer**: Middleware for handling multipart/form-data, which is primarily used for uploading files
- **nodemailer**: Module for sending emails from Node.js applications
- **obd-parser**: Library for parsing OBD-II data, used for vehicle diagnostics
- **puppeteer**: Headless Chrome Node.js API for generating screenshots, PDFs, and automating web page interactions
- **sanitize-html**: Library for cleaning up user-submitted HTML, removing potentially dangerous or unwanted tags and attributes
- **twilio**: Library for interacting with the Twilio API to send messages and make phone calls

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
- **notistack**: Library for displaying snackbars (temporary notifications) in React applications
- **cors**: Middleware to enable Cross-Origin Resource Sharing, allowing controlled access to resources on a web server from a different origin
- **dotenv**: Module to load environment variables from a .env file into process.env
- **react-chart**: Library for creating charts in React applications
- **react-chartjs-2**: React wrapper for Chart.js, a popular charting library
- **aws-sdk**: Software Development Kit (SDK) for integrating with Amazon Web Services (AWS) in JavaScript applications

### Dev
- **nodemon**: Utility to automatically restart the server on file changes
