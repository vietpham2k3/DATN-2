import axios from "../custommize-axios";

const vaitro = () => {
  return axios.get(`/api/nhanvien/vaitro`);
};

const getAllPageNV = (page) => {
  return axios.get(`/api/nhanvien/getAllPage?page=${page}`);
};

const getAllNV = (id) => {
  return axios.get("/api/nhanvien/getAll" + id);
};

const addNV = (values) => {
  return axios.post("/api/nhanvien/add", values);
};

const deleteNhanVien = (id, values) => {
  return axios.put(`api/nhanvien/delete/` + id, values);
};

const updateNV = (id, values) => {
  return axios.put("/api/nhanvien/update/" + id, values);
};

const detailNV = (id) => {
  return axios.get("/api/nhanvien/detail/" + id);
};

const searchNV = (key, trangThai, page) => {
  return axios.get(
    `/api/nhanvien/searchNV?key=${key}&trangThai=${trangThai}&page=${page}`
  );
};

export {
  vaitro,
  getAllNV,
  addNV,
  deleteNhanVien,
  detailNV,
  updateNV,
  getAllPageNV,
  searchNV,
};
