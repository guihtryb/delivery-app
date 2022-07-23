export const API_BASE = 'http://localhost:3001/';

export const basicFetchRequisition = (baseUrl, endpoint) => axios
  .get(`${baseUrl}${endpoint}`)
  .then((res) => res.data);
