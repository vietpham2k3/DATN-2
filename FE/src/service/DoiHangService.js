import axios from '../custommize-axios';

const taoDonTraHang = (values) => {
  return axios.post(`/api/tra-hang/tao-don-tra-hang`, values);
};

const getAll = (id) => {
  return axios.get(`/api/doi-hang/getAll/${id}`);
};

const update = (values) => {
  return axios.put(`/api/doi-hang/update`, values);
};

const yeuCauDoiHang = (id, values) => {
  return axios.post(`/api/doi-hang/yeu-cau-doi-hang/${id}`, values);
};

const addSPToDH = (values) => {
  return axios.post(`/api/doi-hang/add-sp`, values);
};

const deleteSPDH = (id) => {
  return axios.delete(`/api/doi-hang/delete/${id}`);
};

export { taoDonTraHang, update, yeuCauDoiHang, getAll, addSPToDH, deleteSPDH };
