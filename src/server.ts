import { app } from './app.js';
import 'dotenv/config';
import { config } from './config/index.js';
import { logger } from './config/winstonLogger.ts';

(async () => {
  app.listen(config.PORT, () => {
    logger.info(`server is running on ${config.APP_URL}`);
  });
})();
