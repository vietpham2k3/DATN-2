import axios from '../custommize-axios';

const pay = (id) => {
  return axios.get(`/api/pay/${id}`);
};

const payOnline = (tien) => {
  return axios.get(`/api/pay?tien=${tien}`);
};

export { pay, payOnline };
