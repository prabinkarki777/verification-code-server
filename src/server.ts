import app from './app';
import { config } from '@config/index';
import logger from '@utils/logger';

app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
