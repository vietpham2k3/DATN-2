import axios from '../custommize-axios';

const fetchAll = () => {
  return axios.get(`/api/chatlieu/getAll`);
};
const fetchAllList = (page) => {
  return axios.get(`/api/chatlieu/hienthi?page=${page}`);
};

const postCreate = (values) => {
  return axios.post('/api/chatlieu/add', values);
};

const putUpdateCL = (id, values) => {
  return axios.put('/api/chatlieu/update/' + id, values);
};

const detailCL = (id) => {
  return axios.get(`/api/chatlieu/detail/` + id);
};

const deleteCL = (id, ma) => {
  return axios.put(`/api/chatlieu/delete/` + id, { ma: ma });
};

const searchCL = (key, trangThai, page) => {
  return axios.get(`/api/chatlieu/serach?trangThai=${trangThai}&key=${key}&page=${page}`);
};

export { fetchAll, detailCL, fetchAllList, postCreate, putUpdateCL, deleteCL, searchCL };
