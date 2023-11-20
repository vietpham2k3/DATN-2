import axios from '../custommize-axios';
const forgotPasswordKH = (email) => {
  return axios.post('/api/forgot-password?email=' + email);
};
export { forgotPasswordKH };
