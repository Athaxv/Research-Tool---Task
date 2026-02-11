import "dotenv/config";
import express from "express";
import { prisma } from "@repo/db";

const app = express();

app.get("/", async (req, res) => {
    try {
        await prisma.$connect();
        res.send("Hello World! Database connected.");
    } catch (e) {
        res.status(500).send("Database connection failed");
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});