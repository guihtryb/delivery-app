import { API_BASE, basicFetchRequisition } from '.';

const productsService = {
  getAll: async () => [
    ...await basicFetchRequisition(API_BASE, 'products'),
  ],
};

export default productsService;
