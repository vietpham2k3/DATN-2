import axios from '../custommize-axios';

const getAllPageMS = (page) => {
  return axios.get(`/api/mau-sac/hien-thi-page?page=${page}`);
};

const getAllMS = () => {
  return axios.get('/api/mau-sac/hien-thi');
};

const detailMS = (id) => {
  return axios.get(`/api/mau-sac/detail/` + id);
};

const postMS = (values) => {
  return axios.post('/api/mau-sac/add', values);
};

const putMS = (id, values) => {
  return axios.put(`/api/mau-sac/update/` + id, values);
};

const deleteMS = (id, ma) => {
  return axios.put(`/api/mau-sac/delete/` + id, { ma: ma });
};

const searchMS = (key, trangThai, page) => {
  return axios.get(`/api/mau-sac/hien-thi-page-search?trangThai=${trangThai}&key=${key}&page=${page}`);
};

export { getAllPageMS, getAllMS, searchMS, deleteMS, postMS, putMS, detailMS };
