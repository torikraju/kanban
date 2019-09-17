import axios from 'axios';
import { HOST } from './AppUtil';

const instance = axios.create({
  baseURL: HOST,
});

export default instance;
