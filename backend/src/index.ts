import http from 'http';
import express from 'express';
import cors from 'cors';
import { createHmac } from 'crypto';

import environment from '../environment/environment.json';

const app = express();

app.use(cors());

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
app.post('/messages', (request: express.Request, response: express.Response) => {
  if (typeof request.headers['x-api-key'] !== 'string') {
    return response.sendStatus(403);
  }


  // Hash the API key from the request headers with the MD5 algorithm and check if it matches with API key from the environment.
  const apiKeyHashed = createHmac("md5", environment.SECRET_KEY).update(request.headers['x-api-key']).digest("hex");

  if (apiKeyHashed !== environment.API_KEY) {
    return response.sendStatus(403);
  }

  // ... YOUR IMPLEMENTATION ...

  response.sendStatus(201);
});

http.createServer(app);

const port = process.env.PORT || 1337;

app.listen(port);

console.log(`Running on port ${port}`);
