import 'reflect-metadata';
import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import timeRoutes from "./routes/time.routes";
import gameRoutes from "./routes/game.routes";
import { swaggerUi, specs } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Adicione esta linha para expor o JSON do Swagger
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

app.use("/timenow", timeRoutes);
app.use("/api", gameRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rota raiz que redireciona para a documentação
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger documentation available at: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
