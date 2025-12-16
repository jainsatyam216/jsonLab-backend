import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { proxyRequest } from "./proxy.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
// app.get("/ping", (req, res) => {
//   res.json({ message: "pong" });
// });

app.get("/", (req, res) => {
  res.send("JsonLab Backend is running 🚀");
});


app.post("/proxy", proxyRequest);

app.get("/history", async (req, res) => {
  const snapshot = await db
    .collection("history")
    .orderBy("created_at", "desc")
    .limit(20)
    .get();

  const history = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.json(history);
});

// Start server
app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
