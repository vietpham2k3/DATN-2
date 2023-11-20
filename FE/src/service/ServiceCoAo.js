import axios from '../custommize-axios';

const fetchAll = () => {
  return axios.get(`/api/co-ao/getAll`);
};
const fetchAllList = (page) => {
  return axios.get(`/api/co-ao/hienthi?page=${page}`);
};

const postCreate = (values) => {
  return axios.post('/api/co-ao/add', values);
};

const putUpdateCA = (id, values) => {
  return axios.put('/api/co-ao/update/' + id, values);
};
const detailCA = (id) => {
  return axios.get(`/api/co-ao/detail/` + id);
};

const deleteCA = (id, ma) => {
  return axios.put(`/api/co-ao/delete/` + id, { ma: ma });
};

const searchCA = (key, trangThai, page) => {
  return axios.get(`/api/co-ao/serach?trangThai=${trangThai}&key=${key}&page=${page}`);
};

export { fetchAll, detailCA, fetchAllList, postCreate, putUpdateCA, deleteCA, searchCA };
