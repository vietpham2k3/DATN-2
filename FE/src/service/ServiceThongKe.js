import axios from '../custommize-axios';

const doanhThuTongTheoNgay = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tong-ngay-hien-tai`);
};

const doanhThuAllNgay = () => {
  return axios.get(`/api/thong-ke/doanh-thu-all-ngay`);
};

const doanhThuAllThang = () => {
  return axios.get(`/api/thong-ke/doanh-thu-all-thang`);
};

const doanhThuAllNam = () => {
  return axios.get(`/api/thong-ke/doanh-thu-all-nam`);
};

const doanhThuTongTheoThang = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tong-thang-hien-tai`);
};

const doanhThuTongTheoNam = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tong-nam-hien-tai`);
};

const doanhThuTQTheoNgay = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tai-quay-ngay-hien-tai`);
};

const doanhThuTQTheoThang = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tai-quay-thang-hien-tai`);
};

const doanhThuTQTheoNam = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tai-quay-nam-hien-tai`);
};

const doanhThuOnlineTheoNgay = () => {
  return axios.get(`/api/thong-ke/doanh-thu-online-ngay-hien-tai`);
};

const doanhThuOnineTheoThang = () => {
  return axios.get(`/api/thong-ke/doanh-thu-online-thang-hien-tai`);
};

const doanhThuOnlineTheoNam = () => {
  return axios.get(`/api/thong-ke/doanh-thu-online-nam-hien-tai`);
};

const soDonHuyNgay = () => {
  return axios.get(`/api/thong-ke/so-don-huy-ngay`);
};

const soDonTraNgay = () => {
  return axios.get(`/api/thong-ke/so-don-tra-ngay`);
};

const soDonHuyThang = () => {
  return axios.get(`/api/thong-ke/so-don-huy-thang`);
};

const soDonTraThang = () => {
  return axios.get(`/api/thong-ke/so-don-tra-thang`);
};

const soDonHuyNam = () => {
  return axios.get(`/api/thong-ke/so-don-huy-nam`);
};

const soDonTraNam = () => {
  return axios.get(`/api/thong-ke/so-don-tra-nam`);
};

const soDonChoXacNhanNgay = () => {
  return axios.get(`/api/thong-ke/so-don-cho-xac-nhan-ngay`);
};

const soDonChoXacNhanThang = () => {
  return axios.get(`/api/thong-ke/so-don-cho-xac-nhan-thang`);
};

const soDonChoXacNhanNam = () => {
  return axios.get(`/api/thong-ke/so-don-cho-xac-nhan-nam`);
};

const soDonThanhCongNgay = () => {
  return axios.get(`/api/thong-ke/so-don-da-ban-ngay`);
};

const soDonThanhCongThang = () => {
  return axios.get(`/api/thong-ke/so-don-da-ban-thang`);
};

const soDonThanhCongNam = () => {
  return axios.get(`/api/thong-ke/so-don-da-ban-nam`);
};

const sanPhamBanChayNgay = () => {
  return axios.get(`/api/thong-ke/san-pham-ban-chay-trong-ngay`);
};

const sanPhamBanChayThang = () => {
  return axios.get(`/api/thong-ke/san-pham-ban-chay-trong-thang`);
};

const sanPhamBanChayNam = () => {
  return axios.get(`/api/thong-ke/san-pham-ban-chay-trong-nam`);
};

const sanPhamBanChayNgaySearch = (key) => {
  return axios.get(`/api/thong-ke/san-pham-ban-chay-trong-ngay-search?key=${key}`);
};

const sanPhamBanChayThangSearch = (key) => {
  return axios.get(`/api/thong-ke/san-pham-ban-chay-trong-thang-search?key=${key}`);
};

const sanPhamBanChayNamSearch = (key) => {
  return axios.get(`/api/thong-ke/san-pham-ban-chay-trong-nam-search?key=${key}`);
};

const bieuDoNgay = () => {
  return axios.get(`/api/thong-ke/bieu-do-ngay`);
};

const bieuDoThang = () => {
  return axios.get(`/api/thong-ke/bieu-do-thang`);
};

const bieuDoNam = () => {
  return axios.get(`/api/thong-ke/bieu-do-nam`);
};

export {
  doanhThuTongTheoNgay,
  doanhThuTongTheoThang,
  doanhThuTongTheoNam,
  doanhThuOnineTheoThang,
  doanhThuOnlineTheoNam,
  doanhThuOnlineTheoNgay,
  doanhThuTQTheoNam,
  doanhThuTQTheoNgay,
  doanhThuTQTheoThang,
  soDonChoXacNhanNam,
  soDonChoXacNhanNgay,
  soDonChoXacNhanThang,
  soDonHuyNam,
  soDonHuyNgay,
  soDonHuyThang,
  soDonThanhCongNgay,
  soDonThanhCongThang,
  soDonThanhCongNam,
  sanPhamBanChayNgay,
  sanPhamBanChayThang,
  sanPhamBanChayNam,
  sanPhamBanChayNamSearch,
  sanPhamBanChayNgaySearch,
  sanPhamBanChayThangSearch,
  soDonTraNam,
  soDonTraNgay,
  soDonTraThang,
  doanhThuAllNam,
  doanhThuAllNgay,
  doanhThuAllThang,
  bieuDoNgay,
  bieuDoThang,
  bieuDoNam
};
