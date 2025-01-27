import express from 'express';
import {PORT} from "./constant.js";
import cors from 'cors';
import objectivesRouter from './routers/objectives.router.js';

const app = express();

app.use(cors())
app.use("/objectives", objectivesRouter);

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});