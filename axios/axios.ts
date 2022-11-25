import axios from 'axios';


const baseUrl = 'http://localhost:4000';

export const $api = axios.create({
  timeout: 1000,
  baseURL: baseUrl,
  headers: {
    Authorization: '',
  },
});

export const getData = async (substr: string) => {
  return await axios.get(`${$api + substr}`);
};

export const sendData = (data: any) => {
  return axios.post(`${$api}`, data);
};

export const changeData = (data: any) => {
  return axios.put(`${$api}`, data);
};

export const deleteData = () => {
  return axios.delete(`${$api}`);
};