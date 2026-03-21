import { app } from './app.js';
import 'dotenv/config';
import { config } from './config/index.js';

// start server
(async () => {
  app.listen(config.PORT, () => {
    console.log(`server is running on ${config.APP_URL}`);
  });
})();
