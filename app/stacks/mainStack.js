import React from 'react'
import { StackNavigator } from 'react-navigation'
import { TouchableHighlight, View, Image } from 'react-native'
import Drawer from './drawer.js'

var source = <Image style={{ width: 30, height: 30 }} source={require('../../assets/img/menu.png')} />

const Aplication = StackNavigator({
  DrawerStack: {screen: Drawer, initialRouteName: 'Login'}},
  { navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: 'black',
      paddingLeft: 10,
      paddingRight: 10
    },
    title: 'Alethea',
    headerTintColor: 'white',
    headerLeft: <View>
      <TouchableHighlight
        onPress={() => {
          if (navigation.state.index === 0) {
            navigation.navigate('DrawerOpen')
            // source = <Image style={{ width: 30, height: 30 }} source={require('../../assets/img/close.png')} />
          } else {
            navigation.navigate('DrawerClose')
            // source = <Image style={{ width: 30, height: 30 }} source={require('../../assets/img/menu.png')} />
          }
        }}>
        {source}
      </TouchableHighlight>
    </View>
  })
  }
)

const prevGetStateForAction = Aplication.router.getStateForAction
Aplication.router.getStateForAction = (action, state) => {
  console.log('action', action)
  console.log('state', state)
  if (state && action.type === 'Navigation/BACK' && action.key === undefined) {
    return null
  }
  return prevGetStateForAction(action, state)
}

export default Aplication
