import express from "express";
import { client } from "@repo/db";

const app = express();

app.get("/", async (req, res) => {
    try {
        await client.$connect();
        res.send("Hello World! Database connected.");
    } catch (e) {
        res.status(500).send("Database connection failed");
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});