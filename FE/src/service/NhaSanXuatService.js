import axios from '../custommize-axios';

const getAllPageNSX = (page) => {
  return axios.get(`/api/nha-san-xuat/hien-thi-page?page=${page}`);
};

const getAllNSX = () => {
  return axios.get('/api/nha-san-xuat/hien-thi');
};

const detailNSX = (id) => {
  return axios.get(`/api/nha-san-xuat/detail/` + id);
};

const postNSX = (values) => {
  return axios.post('/api/nha-san-xuat/add', values);
};

const putNSX = (id, values) => {
  return axios.put(`/api/nha-san-xuat/update/` + id, values);
};

const deleteNSX = (id, ma) => {
  return axios.put(`/api/nha-san-xuat/delete/` + id, { ma: ma });
};

const searchNSX = (key, trangThai, page) => {
  return axios.get(`/api/nha-san-xuat/hien-thi-page-search?trangThai=${trangThai}&key=${key}&page=${page}`);
};

export { getAllPageNSX, getAllNSX, searchNSX, deleteNSX, postNSX, putNSX, detailNSX };
