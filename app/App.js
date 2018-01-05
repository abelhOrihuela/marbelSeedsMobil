/**
 * @flow
 */

import React from 'react'
import { StackNavigator } from 'react-navigation'

import Login from './pages/Login'
import Home from './pages/Home'
import Reports from './pages/Reports'
import NewReport from './pages/NewReport'
import DetailReport from './pages/DetailReport'

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
    path: 'newReport',
    screen: NewReport,
    left: null
  },
  DetailReport: {
    path: 'detailReport',
    screen: DetailReport,
    left: null
  }
}, {
  navigationOptions: {
    header: false
  }
})

export default class App extends React.Component {
  render () {
    return <Aplication />
  }
}
