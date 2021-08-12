import axios from 'axios';

import { ENDPOINT } from './api.config';

export async function getAllCountries() {
  const response = await axios.get(`${ENDPOINT}all`);
  return response.data;
}
