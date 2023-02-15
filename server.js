import express from "express";

export default function createServer() {
    const app = express();
    //middlewares
    app.use(express.json());

    return app;
}
