// this is a single api call for the entire app, with methods for each kind of call

import axios from 'axios'
// import NProgress from 'nprogress'
// try this for csrf:
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  // withCredentials: false,
  headers: {
    'X-CSRFTOKEN': 'csrftoken'
    // Accept: 'application/json',
    // 'Content-type': 'application/json'
  },
  timeout: 35000
})

export default {
  getSites(params) {
    return apiClient.get('/sites/', params)
  },
  getSite(id) {
    return apiClient.get('/sites/' + id)
  },
  getObss() {
    return apiClient.get('/observations/')
    // include project ID (from store) in query
  },
  getObs(id) {
    return apiClient.get('/observations/' + id)
  },
  getProjects() {
    return apiClient.get('/projects/')
  },
  getProject(id) {
    return apiClient.get('/projects/' + id)
    // return resources and maps too?
  },
  getPosts() {
    return apiClient.get('/posts/')
  },
  getPost(id) {
    return apiClient.get('/posts/' + id)
  },
  getMap(id) {
    return apiClient.get('/maps/' + id)
  },
  getVectorData(url) {
    return apiClient.get(url)
  },
  postObs(formData) {
    return apiClient.post('/observations/', formData)
  },
  postPost(formData) {
    return apiClient.post('/posts/', formData)
  },
  postSite(formData) {
    return apiClient.post('/sites/', formData)
  },
  putUser(id) {
    return apiClient.put('/users/' + id)
  },
  postFile() {
    return apiClient.post('/upload/')
  }
}
