import { app } from './app.ts';
import 'dotenv/config';
import { config } from './config/index.ts';

(async () => {
  app.listen(config.PORT, () => {
    console.log(`server is running on ${config.APP_URL}`);
  });
})();
