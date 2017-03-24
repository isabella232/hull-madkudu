import webhook from './webhook';

export default function updateUser({ metric, ship, client, isBatch = false }, message = {}) {
  const { user = {} } = message;
  const { private_settings = {} } = ship;
  const { madkudu_key = "" } = private_settings;
  const hull = client;
  hull.logger.info('notification.start', { userId: user.id });

  webhook({
    hull,
    payload: {
      //segment-compatible-payload
      foo: "bar"
    },
    madkudu_key
  });

  return false;
}
