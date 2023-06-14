import http from 'http';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { createHmac } from 'crypto';
const { body, validationResult } = require('express-validator');

import environment from '../environment/environment.json';

const app = express();

app.use(cors());
app.use(express.json());

const filePath = process.env.DATABASE_FILE_PATH || 'data/gibberish.enc';
let DATABASE: any[] = [];

function loadDataBase() {
  try {
    const encodedData = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
    const jsonData = JSON.parse(decodedData);
    DATABASE = jsonData;
  } catch (error) {
    console.log(error);
  }
}

/**
 * /messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     description: Retrieve a list of messages from the local database file.
 */
app.get('/messages', (_: express.Request, response: express.Response) => {
  // ... YOUR IMPLEMENTATION ...
  response.json({
    status: 'success',
    messages: DATABASE,
    count: DATABASE.length,
  });
});

/**
 * /messages:
 *   post:
 *     summary: Save an incoming message
 *     description: Save an incoming message to the local database file.
 */
app.post(
  '/messages',
  (request: express.Request, response: express.Response) => {
    if (typeof request.headers['x-api-key'] !== 'string') {
      return response.sendStatus(403);
    }

    // Hash the API key from the request headers with the MD5 algorithm and check if it matches with API key from the environment.
    const apiKeyHashed = createHmac('md5', environment.SECRET_KEY)
      .update(request.headers['x-api-key'])
      .digest('hex');

    const hashedKey = createHmac('md5', environment.SECRET_KEY)
      .update(environment.API_KEY)
      .digest('hex');

    if (apiKeyHashed !== hashedKey) {
      return response.sendStatus(403);
    }
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      // If there are validation errors, send a response with the errors
      return response.status(400).json({ errors: errors.array() });
    }
    const { nickname, message } = request.body;
    DATABASE.push({ nickname, message, sentAt: new Date().getTime() });

    // ... YOUR IMPLEMENTATION ...

    response.status(201).json({
      message: DATABASE[DATABASE.length - 1],
    });
  }
);

http.createServer(app);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  loadDataBase();
});

console.log(`Running on port ${port}`);
