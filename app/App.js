/**
 * @flow
 */

import React from 'react'
import { StackNavigator } from 'react-navigation'

import Login from './pages/Login'
import Home from './pages/Home'
import Reports from './pages/Reports'
// import NewReport from './pages/NewReport'
import NewReportMap from './pages/NewReportMap'
import DetailReport from './pages/DetailReport'
import { PermissionsAndroid } from 'react-native'

const Aplication = StackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    path: 'home',
    screen: Home,
    left: null
  },
  Reports: {
    path: 'detail',
    screen: Reports,
    left: null
  },
  NewReport: {
    path: 'NewReportMap',
    screen: NewReportMap,
    left: null
  },
  DetailReport: {
    path: 'detailReport',
    screen: DetailReport,
    left: null
  }
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTitle: 'Alethea',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
})

export default class App extends React.Component {
  async requestGeolocationPermission () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the geolocation')
      } else {
        alert('Geolocation permission denied')
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
