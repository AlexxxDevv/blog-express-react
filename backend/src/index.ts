import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config';
import { myDataSource } from './app-data-source';
import cors from 'cors';
import routes from './routes';


const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})