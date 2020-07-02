// this is a single api call for the entire app, with methods for each kind of call

import axios from 'axios'
// import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  },
  timeout: 15000
})

export default {
  getSites() {
    return apiClient.get('/sites/')
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
  getResources() {
    return apiClient.get('/resources/')
  },
  getResource(id) {
    return apiClient.get('/resources/' + id)
  },
  getMap(id) {
    return apiClient.get('/maps/' + id)
  },
  getVectorData(url) {
    return apiClient.get(url)
  },
  postObs(obs) {
    return apiClient.post('/observations/', obs)
  }
}
