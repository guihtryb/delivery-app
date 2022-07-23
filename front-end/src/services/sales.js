import { API_BASE, basicFetchRequisition } from '.';

const fetchRequisitionWithHeaders = async (baseUrl, route, headers) => axios
  .get(`${baseUrl}${route}`, { headers })
  .then((res) => res.data);

const salesService = {
  getAllSales: async () => [
    ...await basicFetchRequisition(API_BASE, 'sales'),
  ],
  getAllSellerSales: async () => [
    ...await basicFetchRequisition(API_BASE, 'sales/seller'),
  ],
  getAllUserSales: async (token) => [
    ...await fetchRequisitionWithHeaders(API_BASE, 'sales/user', token),
  ],
  getBySaleId: async (id) => [
    ...await basicFetchRequisition(API_BASE, `sales/${id}`),
  ],
};

export default salesService;
