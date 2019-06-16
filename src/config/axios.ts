import axios from 'axios'

const appId = 'i3skc6kDX5cUQjvjhY4XRsVi'
const appSecret = 'HwjwE4Q9nAnZJ2BMNfWY1NMi'

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com',
  headers: {
    't-app-id': appId,
    't-app-secret': appSecret
  }
})
/* tslint:disable:no-string-literal */
instance.interceptors.request.use(config => {
  const xToken = localStorage.getItem('x-token')
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  instance
  return config;
}, error => {
  console.log(error)
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response;
}, error => {
  console.log(error)
  return Promise.reject(error);
});

/* tslint:enable:no-string-literal */

export default instance