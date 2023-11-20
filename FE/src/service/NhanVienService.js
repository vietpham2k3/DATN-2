import axios from '../custommize-axios';

const vaitro = () => {
  return axios.get(`/api/nhanvien/vaitro`);
};

const getAllPageNV = (page) => {
  return axios.get(`/api/nhanvien/getAllPage?page=${page}`);
};

const getAllNV = (id) => {
  return axios.get('/api/nhanvien/getAll' + id);
};

const addNV = (values) => {
  return axios.post('/api/nhanvien/add', values);
};

const deleteNhanVien = (id, values) => {
  return axios.put(`api/nhanvien/delete/` + id, values);
};
// const deleteNV = (id) => {
//   return axios.put(`http://localhost:8080/api/khach-hang/delete/${id}`);
// };

const updateNV = (id, values) => {
  return axios.put('/api/nhanvien/update/' + id, values);
};

const detailNV = (id) => {
  return axios.get('/api/nhanvien/detail/' + id);
};

const searchNV = (key, trangThai, page) => {
  return axios.get(`/api/nhanvien/searchNV?key=${key}&trangThai=${trangThai}&page=${page}`);
};

export { vaitro, getAllNV, addNV, deleteNhanVien, detailNV, updateNV, getAllPageNV, searchNV };

// // import axios from "axios"
// import axios from "../custommize-axios"

// const fetchAll = () => {
//     return axios.get(`/api/nhanvien/getAll`)
// }

// const fetchAllPage = (page) => {
//     return axios.get(`/api/nhanvien/page?page=${page}`)
// }

// const postNhanVien = (values) => {
//     return axios.post("api/nhanvien/add", values)
// }

// const updateNV = (id, values) => {
//     return axios.put("api/nhanvien/update/" + id, values)
// }

// const deleteNhanVien = (id, values) => {
//     return axios.put(`api/nhanvien/delete/` + id, values)
// }

// const vaitro = () => {
//     return axios.get(`/api/nhanvien/vaitro`)
// }

// const detailNhanVien = (id) => {
//     return axios.get(`/api/nhanvien/detail/` + id)
// }

// const searchNhanVien = (key,trangThai, page) => {
//     return axios.get(`api/nhanvien/search?trangThai=${trangThai}&key=${key}&page=${page}`);
//   };

// export { fetchAll, fetchAllPage, postNhanVien, updateNV, deleteNhanVien, searchNhanVien, detailNhanVien, vaitro }
