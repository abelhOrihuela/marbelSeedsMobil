import qs from 'qs'

// import envVars from '~base/env-variables'
import request from './request'
import { AsyncStorage } from 'react-native'
// import tree from './tree'

export default {
  get (endpoint, data) {
    return this.request('get', endpoint, data)
  },

  post (endpoint, data) {
    return this.request('post', endpoint, data)
  },

  put (endpoint, data) {
    return this.request('put', endpoint, data)
  },

  del (endpoint, data) {
    return this.request('del', endpoint, data)
  },

  async getJwt () {
    try {
      const value = await AsyncStorage.getItem('jwt')

      if (value !== null) {
        return value
      }
      return null
    } catch (error) {
      console.log('error')
    }
  },

  async request (method, endpoint, data) {
    // let url = `http://dev.alethea.commonsense.io/api/${endpoint}`
    let url = `https://e8e811f2.ngrok.io/api/${endpoint}`

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    let token = await this.getJwt()

    if (token) {
      headers['Authorization'] = 'Bearer ' + JSON.parse(token)
    }
    console.log(token)

    // if (tree.get('jwt')) {
    //   headers['Authorization'] = `Bearer ${tree.get('jwt')}`
    // }

    if (method === 'get') {
      url += `?${qs.stringify(data)}`
      return request('get', headers, url)
    } else {
      return request(method, headers, url, data)
    }
  }
}
