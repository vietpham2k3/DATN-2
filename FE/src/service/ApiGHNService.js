import axios from 'axios';

const getTP = () => {
  return axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
    headers: {
      Token: 'c99ea38f-6996-11ee-af43-6ead57e9219a'
    }
  });
};

const getQH = (value) => {
  return axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
    params: value, // Sử dụng params để truyền dữ liệu vào request
    headers: {
      Token: 'c99ea38f-6996-11ee-af43-6ead57e9219a'
    }
  });
};

const getP = (value) => {
  return axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
    params: value, // Sử dụng params để truyền dữ liệu vào request
    headers: {
      Token: 'c99ea38f-6996-11ee-af43-6ead57e9219a'
    }
  });
};

const getServices = (value) => {
  return axios.get(' https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
    params: value, // Sử dụng params để truyền dữ liệu vào request
    headers: {
      Token: 'c99ea38f-6996-11ee-af43-6ead57e9219a',
      shop_id: 4625720
    }
  });
};

const getFee = (value) => {
  return axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
    params: value, // Sử dụng params để truyền dữ liệu vào request
    headers: {
      Token: 'c99ea38f-6996-11ee-af43-6ead57e9219a',
      shop_id: 4625720
    }
  });
};

const TGGH = (value) => {
  return axios.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime', {
    params: value, // Sử dụng params để truyền dữ liệu vào request
    headers: {
      Token: 'c99ea38f-6996-11ee-af43-6ead57e9219a',
      shop_id: 4625720
    }
  });
};

export { getTP, getQH, getP, getServices, getFee, TGGH };
