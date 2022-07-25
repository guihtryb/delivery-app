import {
  API_BASE,
  basicDeleteRequisition,
  basicGetRequisition,
  basicPostRequisition,
  basicUpdateRequisition,
  getRequisitionWithHeaders,
  getRequisitionWithParams,
} from '.';

const salesService = {
  getAllSales: async () => [
    ...await basicGetRequisition(API_BASE, 'sales'),
  ],
  getAllSellerSales: async () => [
    ...await basicGetRequisition(API_BASE, 'sales/seller'),
  ],
  getAllUserSales: async (headers) => [
    ...await getRequisitionWithHeaders(API_BASE, 'sales/user', headers),
  ],
  getBySaleId: async (id) => getRequisitionWithParams(API_BASE, 'sales', id),
  createSale: async (data, headers) => {
    const { id /* , products */ } = await basicPostRequisition(
      API_BASE,
      'sales',
      data,
      headers,
    );
    return id;
  },
  updateSale: async (id, data) => basicUpdateRequisition(API_BASE, 'sales', id, data),
  deleteSale: async (id) => basicDeleteRequisition(API_BASE, 'sales', id),
};

export default salesService;
