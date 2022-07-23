import { API_BASE, basicFetchRequisition } from '.';

const salesService = {
  getAllSales: async () => [
    ...await basicFetchRequisition(API_BASE, 'sales'),
  ],
  getAllSellerSales: async () => [
    ...await basicFetchRequisition(API_BASE, 'sales/seller'),
  ],
  getAllUserSales: async () => [
    ...await basicFetchRequisition(API_BASE, 'sales/user'),
  ],
  getBySaleId: async (id) => [
    ...await basicFetchRequisition(API_BASE, `sales/${id}`),
  ],
};

export default salesService;
