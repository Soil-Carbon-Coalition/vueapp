// this is a single api call for the entire app, with methods for each kind of call

import axios from 'axios'
// import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})
// // before a request is made start the nprogress
// apiClient.interceptors.request.use(config => {
//   NProgress.start()
//   return config
// })

// // // before a response is returned stop nprogress
// apiClient.interceptors.response.use(response => {
//   NProgress.done()
//   return response
// })

export default {
  getSites() {
    return apiClient.get('/sites/')
  },
  getSite(id) {
    return apiClient.get('/sites/' + id)
  },
  getObss() {
    return apiClient.get('/observations/')
  },
  getObs(id) {
    return apiClient.get('/observations/' + id)
  },
  postObs(obs) {
    return apiClient.post('/observations/', obs)
  }
}
