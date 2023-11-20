import axios from '../custommize-axios';

const getAllPageKH = (page) => {
  return axios.get(`/api/khach-hang/getAllPage?page=${page}`);
};

const getAllKH = (id) => {
  return axios.get('/api/khach-hang/getAll' + id);
};

const getAll = (id) => {
  return axios.get('/api/khach-hang/getAllKH/' + id);
};

const addKH = (values) => {
  return axios.post('/api/khach-hang/add', values);
};

const deleteKH = (id) => {
  return axios.put(`/api/khach-hang/delete/${id}`);
};

const updateKH = (id, values) => {
  return axios.put('/api/khach-hang/update/' + id, values);
};

const detailKH = (id) => {
  return axios.get('/api/khach-hang/detail/' + id);
};

const searchKh = (key, trangThai, gioiTinh, page) => {
  return axios.get(`/api/khach-hang/searchKH?key=${key}&trangThai=${trangThai}&gioiTinh=${gioiTinh}&page=${page}`);
};

const getAllDcKh = (id) => {
  return axios.get('/api/dia-chi/getAllIdKh/' + id);
};

const deleteDC = (id) => {
  return axios.delete('/api/dia-chi/delete/' + id);
};

const detailDC = (id) => {
  return axios.get('/api/dia-chi/detail/' + id);
};

const updateDC = (id, values) => {
  return axios.put('/api/dia-chi/update/' + id, values);
};

const addDC = (id, values) => {
  return axios.post('/api/dia-chi/addDCKH/' + id, values);
};

const addDCKH = (id, values) => {
  return axios.post('/api/dia-chi/add/' + id, values);
};
const updateInfo = (id, values) => {
  return axios.put('/api/khach-hang/updateinfo/' + id, values);
};

const changePassword = (id, values) => {
  return axios.put('/api/khach-hang/change-password/' + id, values);
};
const checkCurrentPassword = (values) => {
  return axios.post('/api/khach-hang/check-current-password', values);
};
export {
  getAllKH,
  getAll,
  addKH,
  deleteKH,
  detailKH,
  updateKH,
  getAllPageKH,
  searchKh,
  getAllDcKh,
  deleteDC,
  detailDC,
  updateDC,
  addDC,
  addDCKH,
  updateInfo,
  changePassword,
  checkCurrentPassword
};
