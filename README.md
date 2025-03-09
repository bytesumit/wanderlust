# Wanderlust Project

Wanderlust is a web application inspired by Airbnb, where users can book and list places to stay for their travels. This project is built using **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **Bootstrap**.

## Features

- User Authentication (SignUp/Login)
- List New Properties (Add New Places)
- View Available Listings
- Edit & Delete Property Listings
- Search Functionality
- Responsive Design using Bootstrap
- Data Storage using MongoDB
- Dynamic Templating with EJS

## Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)

### Frontend:
- EJS (Embedded JavaScript Templates)
- Bootstrap

### Database:
- MongoDB (Cloud or Local)

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed or MongoDB Atlas account

### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   DATABASE_URL=mongodb://localhost:27017/wanderlust
   PORT=3000
   ```

4. Start MongoDB server (If using local MongoDB):
   ```bash
   mongod
   ```

5. Start the App:
   ```bash
   npm start
   ```

6. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Folder Structure

```
|-- Wanderlust
|   |-- models        # Mongoose Models
|   |-- routes        # Express Routes
|   |-- views         # EJS Templates
|   |-- public        # Static Files (CSS, JS)
|   |-- app.js        # Main Application File
|   |-- package.json  # Dependencies
|   |-- .env          # Environment Variables
```

## Dependencies
- express
- mongoose
- ejs
- dotenv
- body-parser
- method-override
- express-session
- passport
- passport-local

## Screenshots
Coming Soon...

## Future Featurees
- Payment Gateway Integration
- Google Maps Integration

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

