import axios from 'axios';
console.log('haii');
import { ENDPOINT } from './api.config';

export async function getAllCountries() {
  const response = await axios.get(`${ENDPOINT}all`);
  return response.data;
}
