import express from "express";
import timeRoutes from "./routes/time.routes";

const app = express();
const PORT = 3333;

app.use(express.json());

// Rotas
app.use("/timenow", timeRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
