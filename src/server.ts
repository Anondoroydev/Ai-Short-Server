import { app } from './app.ts';

(async () => {
  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });
})();
