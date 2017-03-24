import axios from 'axios';

export default function webhook({ hull, payload = {}, api_key = "" }) {
  return axios({
    method: "post",
    url: "https://api.madkudu.com/v1/segment",
    data: payload,
    auth: {
      username: api_key,
      password: ''
    }
  })
  .then(
    ({ data, status, statusText }) => hull.logger.info('madkudu.success', {
      userId: payload.user.id,
      status,
      statusText,
      data
    }))
  .catch(({ response, message: msg }) => {
    if (response) {
      const { data, status } = response;
      hull.logger.info('madkudu.error', { message: 'madkudu failed', data, status });
    } else {
      // Something happened in setting up the request that triggered an Error
      hull.logger.error('madkudu.error', { message: msg });
    }
  });
}
