import webhook from './webhook';
import map from './map';

export default function updateUser({ metric, ship, client, isBatch = false }, message = {}) {
  const { user = {} } = message;
  const { settings = {} } = ship;
  const { api_key = "" } = settings;
  const hull = client;

  if (!api_key) {
    hull.logger.info("No write_key for ship");
    return false;
  }

  hull.logger.info('notification.start', { userId: user.id });

  const { identify = {} } = map(message, api_key);

  if (!identify.userId) {
    hull.logger.info("skip.user - no identifier", message);
    return false;
  }

  identify.api_key = api_key;

  webhook({ hull, payload: identify, api_key });

  return false;
}
