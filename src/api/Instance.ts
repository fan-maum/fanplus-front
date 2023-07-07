import axios from 'axios';

export const voteInstance = axios.create({
  baseURL: 'https://065f6100-40f2-4882-aa55-9aa4d079ebe3.mock.pstmn.io',
  // baseURL: 'https://napi.appphotocard.com',
  headers: {
    'Content-Type': `application/json`,
  },
});
