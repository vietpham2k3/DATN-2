import axios from '../custommize-axios';

const fetchAll = () => {
  return axios.get(`/api/vai-tro/getAll`);
};
const fetchAllList = (page) => {
  return axios.get(`/api/vai-tro/hienthi?page=${page}`);
};

const postCreate = (values) => {
  return axios.post('/api/vai-tro/add', values);
};

const putUpdateVT = (id, values) => {
  return axios.put('/api/vai-tro/update/' + id, values);
};
const detailVT = (id) => {
  return axios.get(`/api/vai-tro/detail/` + id);
};

const deleteVT = (id, ma) => {
  return axios.put(`/api/vai-tro/delete/` + id, { ma: ma });
};

const searchVT = (key, trangThai, page) => {
  return axios.get(`/api/vai-tro/serach?trangThai=${trangThai}&key=${key}&page=${page}`);
};

export { fetchAll, detailVT, fetchAllList, postCreate, putUpdateVT, deleteVT, searchVT };
