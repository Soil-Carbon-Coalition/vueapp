// this is a single api call for the entire app, with methods for each kind of call

import axios from 'axios'
// import { map } from 'leaflet'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default {
  getMaps() {
    return apiClient.get('/maps')
  },
  getMap(id) {
    return apiClient.get('/maps/' + id)
  },
  postMap(map) {
    return apiClient.post('/maps/', map)
  }
}
