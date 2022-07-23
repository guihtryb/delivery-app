import axios from 'axios';
import API_BASE from '.';

export const basicFetchRequisition = (baseUrl, endpoint) => axios
  .get(`${baseUrl}${endpoint}`)
  .then((res) => res.data);

const filterByRole = (role, userData) => userData.filter((item) => item.role === role);

const usersService = {
  getSellers: async () => [
    ...filterByRole('seller', await basicFetchRequisition(API_BASE, 'users')),
  ],
  getAdmins: async () => [
    ...filterByRole('administrator', await basicFetchRequisition(API_BASE, 'users')),
  ],
  getCustomers: async () => [
    ...filterByRole('customer', await basicFetchRequisition(API_BASE, 'users')),
  ],
  getAll: async () => [...await basicFetchRequisition(API_BASE, 'users')],
};

export default usersService;
