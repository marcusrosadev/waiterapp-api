import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io'
import http from 'node:http';

import { router } from './router.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app)
export const io = new Server(server);

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    const port = 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    })

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

