import request from './request'

export default {
  get (endpoint, data) {
    return this.request('get', endpoint, data)
  },

  async request (method, endpoint, data) {
    let url = `https://api.mapbox.com/geocoding/v5/${endpoint}?access_token=pk.eyJ1IjoiYWJlbGhjcyIsImEiOiJjamU0czlrbXAyYXprMndxbDFnZ2tvdjVxIn0.QQe8o1dfVO3mW6QCMaodRQ&country=mx&types=address`
    return request('get', {}, url)
  }
}
