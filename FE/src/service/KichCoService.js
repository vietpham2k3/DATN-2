import axios from '../custommize-axios';

const fetchAll = () => {
  return axios.get(`/api/kich-co/getAll`);
};
const fetchAllCTSP = () => {
  return axios.get(`/api/kich-co/getAllchitietsp`);
};
const fetchAllList = (page) => {
  return axios.get(`/api/kich-co/hienthi?page=${page}`);
};

const postCreate = (values) => {
  return axios.post('/api/kich-co/add', values);
};

const putUpdateKC = (id, values) => {
  return axios.put('/api/kich-co/update/' + id, values);
};
const detailKC = (id) => {
  return axios.get(`/api/kich-co/detail/` + id);
};

const deleteKC = (id, ma) => {
  return axios.put(`/api/kich-co/delete/` + id, { ma: ma });
};

const searchKC = (key, trangThai, page) => {
  return axios.get(`/api/kich-co/serach?trangThai=${trangThai}&key=${key}&page=${page}`);
};

export { fetchAll, detailKC, fetchAllList, postCreate, putUpdateKC, deleteKC, searchKC, fetchAllCTSP };
