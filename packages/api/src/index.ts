import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("API is running. Try /health");
});


const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
