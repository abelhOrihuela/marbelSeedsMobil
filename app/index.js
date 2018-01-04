import {
  StackNavigator
} from 'react-navigation'

import Home from './pages/Home'
const Navigator = StackNavigator({
  drawerStack: {screen: Home},
  headerMode: 'none',
  initialRouteName: 'home'
})

export default Navigator
