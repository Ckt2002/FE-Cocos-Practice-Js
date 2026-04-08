import express, { type Request, type Response } from 'express';
import routes from './routes/routes.js';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
});