# Express.js Project with Nodemon

A simple Express.js server setup with nodemon for automatic server restarts during development.

## Installation

Install dependencies:

```bash
npm install
```

## Usage

### Development Mode (with nodemon)

Start the server in development mode with automatic restarts:

```bash
npm run dev
```

### Production Mode

Start the server in production mode:

```bash
npm start
```

## Server Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint

## Configuration

The server runs on port `3000` by default. You can change this by setting the `PORT` environment variable.

## Project Structure

```
redis/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── nodemon.json       # Nodemon configuration
└── README.md          # Project documentation
```

