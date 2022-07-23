import axios from 'axios';
import API_BASE from '.';

export const basicFetchRequisition = (baseUrl, endpoint) => axios
  .get(`${baseUrl}${endpoint}`)
  .then((res) => res.data);

const productsService = {
  getAll: async () => [
    ...await basicFetchRequisition(API_BASE, 'products'),
  ],
};

export default productsService;
