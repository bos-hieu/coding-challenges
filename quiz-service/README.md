# Quiz Service

This is a simple quiz service that allows users to create quizzes and answer them.

## Installation
```
npm install
```

## Configuration
Copy the `.env.example` file to `.env` and update the following environment variables:
- `PORT`: The port on which the server will run.
- `MONGODB_URI`: The URI of the MongoDB database.

## Start
```
npm start
```

## Mock Data
To seed the database with mock data, you can use the following command:
```
node mockData.js
```