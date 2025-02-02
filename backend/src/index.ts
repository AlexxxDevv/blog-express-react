import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { myDataSource } from './app-data-source';
import routes from './routes';

const { PORT = 3000 } = process.env;

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const dirName = path.join(__dirname, 'uploads');
console.log(dirName);

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
