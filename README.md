# Welcome to Task Sonic

Task Sonic is a web platform inspired by Airtasker, where users can submit their tasks and browse tasks submitted by others. The website is not a clone of Airtasker but shares similar functionality in its features and design.

## Features

- **Submit Tasks**: Users can create and submit tasks with detailed descriptions.
- **Browse Tasks**: Users can browse through the tasks submitted by others.
- **User-Friendly UI**: A modern interface built with Material UI.

---

## Technologies Used

### Backend
- **Node.js**: For server-side operations.
- **Express.js**: Framework for building REST APIs.
- **MySQLi**: Database for storing tasks and user data.

### Frontend
- **React.js**: Library for building the user interface.
- **Axios**: HTTP client for fetching data from the backend.
- **Material UI**: For styling and components.
- **HTML & CSS**: Additional layout and design.

---

## How to Run the Project?

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (latest stable version)
- **MySQL database**

task_sonic
├── server
│   ├── config>config.js
│   ├── controllers
│   └── database
│   └── middleware
│   └── models
│   └── public
│   └── routes
│   └── views
│   └── index.js
│   └── other...
├── src
│   │   ├── assets
│   │   ├── auth
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   └── App.jsx
│   │   └── main.jsx
│   └── public

### Steps

0. **Clone the Repository**
   ```bash
   git clone https://github.com/monabbirhasan/task-sonic.git
   cd task-sonic

# Project Setup Guide

## Backend Setup

1. **Navigate to the server folder:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend directory and add the following:**

   ```env
    DB_HOST=localhost
    DB_USER=root
    DB_NAME=task_sonic
    DB_PASSWORD=
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

---

## Frontend Setup

1. **Navigate to the frontend folder:**

   ```bash
   cd ..
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the project:**

   ```bash
   npm run dev
   ```

---

## Database Setup

1. **Import the database schema into your MySQL database:**

   ```bash
   task_sonic.sql
   ```

---