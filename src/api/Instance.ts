import axios from 'axios';

export const voteInstance = axios.create({
  baseURL: 'https://napi.appphotocard.com:8000',
  headers: {
    'Content-Type': `application/json`,
  },
});
