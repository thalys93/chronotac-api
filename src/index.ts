import 'reflect-metadata';
import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import timeRoutes from "./routes/time.routes";
import gameRoutes from "./routes/game.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use("/timenow", timeRoutes);
app.use("/api", gameRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Chronotac API is running!' });
});

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });
