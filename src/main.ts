import * as express from 'express';
import * as cors from 'cors';
import { configs } from './configs';
import { controller } from './controller';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1', controller.routes);

export function jwtAuthPractice(): void {
  app.listen(configs.PORT, () => {
    console.log(`Server is running on port: ${configs.PORT}`);
  });
}
