import axios from '../custommize-axios';

const getAllPageKM = (page) => {
  return axios.get(`/api/khuyen-mai/hien-thi-page?page=${page}`);
};

const getAllKM = (tien) => {
  return axios.get(`/api/khuyen-mai/hien-thi?tien=${tien}`);
};

const detailKM = (id) => {
  return axios.get(`/api/khuyen-mai/detail/` + id);
};

const postKM = (values) => {
  return axios.post('/api/khuyen-mai/add', values);
};

const putKM = (id, values) => {
  return axios.put(`/api/khuyen-mai/update/` + id, values);
};

const deleteKM = (id, values) => {
  return axios.put(`/api/khuyen-mai/delete/` + id, values);
};

const searchKM = (key, trangThai, page) => {
  return axios.get(`/api/khuyen-mai/hien-thi-page-search?trangThai=${trangThai}&key=${key}&page=${page}`);
};

export { getAllPageKM, getAllKM, searchKM, deleteKM, postKM, putKM, detailKM };
