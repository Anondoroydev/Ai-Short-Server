import 'dotenv/config';
import { app } from './app.ts';
import { config } from './config/index.ts';
import { logger } from './config/winstonLogger.ts';
(async () => {
  app.listen(config.PORT, () => {
    logger.info(`server is running on ${config.APP_URL}`);
  });
})();
