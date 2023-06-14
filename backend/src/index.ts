import http from 'http';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { createHmac } from 'crypto';

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

    if (apiKeyHashed !== environment.API_KEY) {
      return response.sendStatus(403);
    }

    // ... YOUR IMPLEMENTATION ...

    response.sendStatus(201);
  }
);

http.createServer(app);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  loadDataBase();
  console.log(DATABASE);
});

console.log(`Running on port ${port}`);
