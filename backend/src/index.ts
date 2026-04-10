import express, { type Request, type Response } from 'express';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();

app.use(cors({
    origin: process.env.BASE_FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
});