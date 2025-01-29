import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config';

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
}) 