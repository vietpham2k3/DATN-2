import axios from '../custommize-axios';

const postGH = (nguoiTao, values) => {
  return axios.post(`/api/gio-hang/tao-hoa-don?nguoiTao=${nguoiTao}`, values);
};

const deleteByIdHD = (id) => {
  return axios.delete(`/api/gio-hang/delete/${id}`);
};

const addKhuyenMai = (values) => {
  return axios.post('/api/gio-hang/add-km', values);
};

const thanhToan = (id, values, nguoiTao) => {
  return axios.put(`/api/gio-hang/update-hd-checkout/${id}?nguoiTao=${nguoiTao}`, values);
};

const count = (id) => {
  return axios.get(`/api/gio-hang/countSP?id=${id}`);
};

const themGioHang = (id, values) => {
  return axios.post(`/api/gio-hang/them-gio-hang?idKH=${id}`, values);
};

const detailGH = (id) => {
  return axios.get(`/api/gio-hang/detailGH?id=${id}`);
};

const getAllGH = (id) => {
  return axios.get(`/api/gio-hang/getAll?id=${id}`);
};

const deleteSPInGH = (id) => {
  return axios.delete(`/api/gio-hang/deleteSPInGH/${id}`);
};

const updateSLGH = (id, values) => {
  return axios.put(`/api/gio-hang/update-sl/${id}`, values);
};

const clearGH = (id, idHD) => {
  return axios.delete(`/api/gio-hang/clearGH/${id}/${idHD}`);
};

export { postGH, deleteByIdHD, addKhuyenMai, thanhToan, count, themGioHang, detailGH, getAllGH, deleteSPInGH, updateSLGH, clearGH };
