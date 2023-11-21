import axios from "../custommize-axios";

const getAllPageDH = (page) => {
  return axios.get(`/api/hoa-don/hien-thi-page?page=${page}`);
};

const searchByTrangThai = (id, values) => {
  return axios.get(`/api/hoa-don/searchByTrangThai/${id}?trangThai=${values}`);
};

const findVIP = (key, tuNgay, denNgay, trangThai, loaiDon, page) => {
  return axios.get(`/api/hoa-don/hien-thi-page-find?key=${key}&tuNgay=${tuNgay}&denNgay=${denNgay}
  &trangThai=${trangThai}&loaiDon=${loaiDon}&page=${page}`);
};

const getAllHD = () => {
  return axios.get("/api/hoa-don/hien-thi");
};

const getAllSPDoiHang = (id) => {
  return axios.get("/api/hoa-don/hien-thi-sp-doi/" + id);
};

const getAllSP = () => {
  return axios.get("/api/hoa-don/hien-thi-san-pham");
};

const getAllKH = () => {
  return axios.get("/api/hoa-don/getAll");
};

const getAllKCByIdMSAndIdSP = (idMS, idSP) => {
  return axios.get(`/api/hoa-don/getAllKCByIdMSAndIdSP/${idMS}/${idSP}`);
};

const findAllAnhByIdMSAndIdSP = (idMS, idSP) => {
  return axios.get(`/api/hoa-don/findAllAnhByIdMSAndIdSP/${idMS}/${idSP}`);
};

const getAllMSByIdSP = (id) => {
  return axios.get(`/api/hoa-don/getAllMSByIdSP/${id}`);
};

const searchCTSPofDH = (key) => {
  return axios.get(`/api/hoa-don/searchSP?key=${key}`);
};

const searchKHofDH = (key) => {
  return axios.get(`/api/hoa-don/searchKHinBH?key=${key}`);
};

const detailHD = (id) => {
  return axios.get(`/api/hoa-don/detail/` + id);
};

const detailLSHD = (id) => {
  return axios.get(`/api/hoa-don/hien-thi-list-lshd/` + id);
};

const addKH2 = (id, values) => {
  return axios.post(`/api/hoa-don/addKHinBH/` + id, values);
};

const xacNhanDH = (id, values, nguoiTao) => {
  return axios.post(`/api/hoa-don/xac-nhan/${id}?nguoiTao=${nguoiTao}`, values);
};

const huyDonHang = (id, values, nguoiTao) => {
  return axios.post(`/api/hoa-don/huy-don/${id}?nguoiTao=${nguoiTao}`, values);
};

const nhanHang = (id, values) => {
  return axios.post(`/api/hoa-don/nhan-hang/` + id, values);
};

const requestHuyDon = (id, values) => {
  return axios.post(`/api/hoa-don/request-huy-don/` + id, values);
};

const xacNhanListIds = (values, nguoiTao) => {
  return axios.post(`/api/hoa-don/xac-nhan?nguoiTao=${nguoiTao}`, values);
};

const huyDonListIds = (values, nguoiTao) => {
  return axios.post(`/api/hoa-don/huy-don?nguoiTao=${nguoiTao}`, values);
};

const xacNhanGiao = (id, values) => {
  return axios.post(`/api/hoa-don/xac-nhan-giao-hang/` + id, values);
};

const giaoHangThanhCong = (id, values) => {
  return axios.post(`/api/hoa-don/giao-hang-thanh-cong/` + id, values);
};

const giaoHangThatBai = (id, values) => {
  return axios.post(`/api/hoa-don/giao-hang-that-bai/` + id, values);
};

const giaoLaiLan1 = (id, values) => {
  return axios.post(`/api/hoa-don/giao-lai-lan-1/` + id, values);
};

const giaoLaiLan2 = (id, values) => {
  return axios.post(`/api/hoa-don/giao-lai-lan-2/` + id, values);
};

const giaoLaiLan3 = (id, values) => {
  return axios.post(`/api/hoa-don/giao-lai-lan-3/` + id, values);
};

const giaoThatBaiLan1 = (id, values) => {
  return axios.post(`/api/hoa-don/giao-hang-that-bai-lan-1/` + id, values);
};

const giaoThatBaiLan2 = (id, values) => {
  return axios.post(`/api/hoa-don/giao-hang-that-bai-lan-2/` + id, values);
};

const giaoThatBaiLan3 = (id, values) => {
  return axios.post(`/api/hoa-don/giao-hang-that-bai-lan-3/` + id, values);
};

const xacNhanTraHang = (id, values) => {
  return axios.post(`/api/hoa-don/xac-nhan-tra-hang/` + id, values);
};

const huyDonTraHang = (id, values) => {
  return axios.post(`/api/hoa-don/huy-don-tra-hang/` + id, values);
};

const xacNhanThanhToan = (id, values) => {
  return axios.post(`/api/hoa-don/xac-nhan-thanh-toan/` + id, values);
};

const addHD = (values, nguoiTao) => {
  return axios.post(`/api/hoa-don/add?nguoiTao=${nguoiTao}`, values);
};

const getById = (id) => {
  return axios.get(`/api/hoa-don/getById/${id}`);
};

const addSP = (values) => {
  return axios.post(`/api/hoa-don/add-sp`, values);
};

const updateSL = (id, values) => {
  return axios.put(`/api/hoa-don/update-sl/${id}`, values);
};

const deleteHDCT = (id) => {
  return axios.delete(`/api/hoa-don/delete-hdct/${id}`);
};

const updateHD = (id, values) => {
  return axios.put(`/api/hoa-don/update-hd/${id}`, values);
};

const updateHoaDon = (id, values) => {
  return axios.put(`/api/hoa-don/updateHD/${id}`, values);
};

const getKmById = (id) => {
  return axios.get(`/api/hoa-don/getKmById/${id}`);
};

const addKM = (values) => {
  return axios.post(`/api/hoa-don/addKM`, values);
};

const thanhToan = (id, nguoiTao) => {
  return axios.put(`/api/hoa-don/thanh-toan/${id}?nguoiTao=${nguoiTao}`);
};

const hienThiDoiHang = (id) => {
  return axios.get(`/api/hoa-don/hien-thi-doi-hang/` + id);
};

const hienThiSPYCDoiHang = (id) => {
  return axios.get(`/api/hoa-don/hien-thi-sp-yeu-cau-doi/` + id);
};

const hienThiYCDoiHang = (id) => {
  return axios.get(`/api/hoa-don/hien-thi-don-yeu-cau-doi/` + id);
};

const hienThiHangLoi = (id) => {
  return axios.get(`/api/hoa-don/hien-thi-hang-loi/` + id);
};

const getAllSPLoi = (id) => {
  return axios.get("/api/hoa-don/hien-thi-sp-loi/" + id);
};

const hangLoi = (id, values) => {
  return axios.put("/api/hoa-don/update-sl-hang-loi/" + id, values);
};

export {
  getAllHD,
  requestHuyDon,
  nhanHang,
  searchByTrangThai,
  thanhToan,
  updateHD,
  addKM,
  getKmById,
  getAllPageDH,
  xacNhanThanhToan,
  xacNhanGiao,
  huyDonHang,
  detailLSHD,
  detailHD,
  addHD,
  getById,
  addSP,
  findVIP,
  updateSL,
  deleteHDCT,
  xacNhanDH,
  getAllSP,
  searchCTSPofDH,
  getAllKCByIdMSAndIdSP,
  getAllMSByIdSP,
  getAllKH,
  searchKHofDH,
  addKH2,
  xacNhanListIds,
  huyDonListIds,
  findAllAnhByIdMSAndIdSP,
  giaoHangThanhCong,
  giaoHangThatBai,
  updateHoaDon,
  giaoLaiLan1,
  giaoLaiLan2,
  giaoLaiLan3,
  giaoThatBaiLan1,
  giaoThatBaiLan2,
  giaoThatBaiLan3,
  xacNhanTraHang,
  huyDonTraHang,
  hienThiDoiHang,
  getAllSPDoiHang,
  hienThiHangLoi,
  getAllSPLoi,
  hienThiSPYCDoiHang,
  hienThiYCDoiHang,
  hangLoi,
};
