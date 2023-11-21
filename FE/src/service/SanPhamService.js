// import axios from 'axios'
import axios from "../custommize-axios";

const getAll = () => {
  return axios.get("/api/chi-tiet-san-pham/getAllCTSP?sort=ngay_tao,desc");
};

const getAllBestseller = () => {
  return axios.get("/api/chi-tiet-san-pham/getAllBestseller");
};

const getAllSPNEW = () => {
  return axios.get("/api/chi-tiet-san-pham/getAllSPNEW");
};

const getAllCTSPWeb = (page) => {
  console.log(page);
  return axios.get(`/api/chi-tiet-san-pham/getAllWeb?page=${page}`);
};

const getAllProduct = () => {
  return axios.get("/api/chi-tiet-san-pham/getAllProduct");
};

const getAllCTSP = (page) => {
  return axios.get(`/api/chi-tiet-san-pham/getAll?page=${page}`);
};

const postCTSP = (values) => {
  return axios.post("/api/chi-tiet-san-pham/add", values);
};

const putCTSP = (id, values) => {
  return axios.put("/api/chi-tiet-san-pham/update/" + id, values);
};

const deleteCTSP = (id) => {
  return axios.put("/api/chi-tiet-san-pham/delete/" + id);
};

const deleteMSKC = (id) => {
  return axios.put("/api/chi-tiet-san-pham/deleteMSKC/" + id);
};

const searchCTSP = (
  key,
  trangThai,
  min,
  max,
  mauSac,
  chatLieu,
  loaiSanPham,
  nhaSanXuat,
  page
) => {
  return axios.get(
    `/api/chi-tiet-san-pham/search?key=${key}&trangThai=${trangThai}&min=${min}&max=${max}&mauSac=${mauSac}&chatLieu=${chatLieu}&loaiSanPham=${loaiSanPham}&nhaSanXuat=${nhaSanXuat}&page=${page}`
  );
};

const searchSP = (key, page) => {
  return axios.get(`/api/chi-tiet-san-pham/searchMT?key=${key}&page=${page}`);
};

const detailCTSP = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/detail/${id}`);
};

const getAllListCL = () => {
  return axios.get(`/api/chatlieu/getAll`);
};

const getAllListKC = () => {
  return axios.get(`/api/kich-co/getAll`);
};

const getAllListMS = () => {
  return axios.get(`/api/mau-sac/hien-thi`);
};

const getAllListLSP = () => {
  return axios.get(`/api/loai-san-pham/getAll`);
};

const getAllListNSX = () => {
  return axios.get(`/api/nha-san-xuat/hien-thi`);
};
const addAnh = (values) => {
  return axios.post("/api/chi-tiet-san-pham/upload", values);
};

const listAnh = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/view-all-image/${id}`);
};

const deleteAnh = (id) => {
  return axios.delete(`/api/chi-tiet-san-pham/delete-img/${id}`);
};

const getAllByIdSP = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/getAllByIdSP/${id}`);
};

const getAllByIdSPTT = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/getAllByIdSPTT/${id}`);
};

const updateSL = (id, soLuong) => {
  return axios.put(
    `/api/chi-tiet-san-pham/update-sl-sp/${id}?soLuong=${soLuong}`
  );
};

const findAllProductClient = (values) => {
  return axios.post(`/api/chi-tiet-san-pham/findAll`, values);
};

const filterProduct = (values) => {
  return axios.post("/api/chi-tiet-san-pham/filter", values);
};

export {
  getAll,
  updateSL,
  deleteMSKC,
  getAllByIdSPTT,
  getAllByIdSP,
  getAllCTSP,
  getAllListKC,
  deleteCTSP,
  listAnh,
  addAnh,
  postCTSP,
  deleteAnh,
  putCTSP,
  searchCTSP,
  detailCTSP,
  getAllListCL,
  getAllListMS,
  getAllListLSP,
  getAllListNSX,
  getAllSPNEW,
  getAllBestseller,
  getAllProduct,
  getAllCTSPWeb,
  findAllProductClient,
  filterProduct,
  searchSP,
};
