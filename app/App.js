import React from 'react'
import { PermissionsAndroid } from 'react-native'
import Aplication from './stacks/mainStack.js'

export default class App extends React.Component {
  async requestGeolocationPermission () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the geolocation')
      } else {
        console.log('Geolocation permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  componentDidMount () {
    this.requestGeolocationPermission()
  }

  render () {
    return <Aplication />
  }
}
