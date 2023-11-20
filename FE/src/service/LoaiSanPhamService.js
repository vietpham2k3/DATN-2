import axios from '../custommize-axios';

const getAll = () => {
  return axios.get(`/api/loai-san-pham/getAll`);
};

const getAllPages = (page) => {
  return axios.get(`/api/loai-san-pham/getAllPages?page=${page}`);
};

const detail = (id) => {
  return axios.get(`/api/loai-san-pham/detail/` + id);
};

const add = (values) => {
  return axios.post('/api/loai-san-pham/add', values);
};

const updateLSP = (id, values) => {
  return axios.put(`/api/loai-san-pham/update/` + id, values);
};

const deleteLSP = (id, ma) => {
  return axios.put(`/api/loai-san-pham/delete/` + id, { ma: ma });
};

const searchLSP = (key, trangThai, page) => {
  return axios.get(`/api/loai-san-pham/searchPage?key=${key}&trangThai=${trangThai}&page=${page}`);
};

export { getAll, getAllPages, detail, add, updateLSP, deleteLSP, searchLSP };
