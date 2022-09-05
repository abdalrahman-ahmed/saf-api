import express, { Application, Request, Response } from 'express';
import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import morgan from 'morgan';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import errorHandler from './middlewares/errorHandler';
import config from './config';
import routeHandler from './routes/index.routes';

const PORT = config.port || 4400;
const MONGO_URI: string = config.mongo || '';

//LOCALES SETUP
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    supportedLngs: ['ar', 'en'],
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json',
    },
    fallbackLng: 'ar',
  });

const app: Application = express();

app.use(middleware.handle(i18next));
app.use(morgan('short'));
app.use(express.json());
app.use(express.static('public'));

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .json(
      'Welcome To SAF API 🥰. Please Check API Documentation For Better Guidance.'
    );
});

app.use(routeHandler);

// 404 ENDPOINT
app.use((_req: Request, res: Response) => {
  res.status(404).send({
    message:
      'Are You Lost? Please make sure you are looking for the right place 😎 😧!',
    status: 404,
  });
});

// ERROR HANDLER
app.use(errorHandler);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `DB Connected Successfully And Server is running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    throw new Error(err);
  });
