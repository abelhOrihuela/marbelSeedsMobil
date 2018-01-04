/**
 * @flow
 */

import React from 'react'
import { StackNavigator } from 'react-navigation'

import Login from './pages/Login'
import Home from './pages/Home'
import Detail from './pages/Detail'

const Aplication = StackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    path: 'home',
    screen: Home,
    left: null
  },
  Detail: {
    path: 'detail',
    screen: Detail,
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
