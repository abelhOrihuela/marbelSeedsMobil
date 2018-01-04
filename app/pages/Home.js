import api from '../core/api'

import React from 'react'
import { Text, View, AsyncStorage, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      me: {},
      assignedMuniciplaities: []
    }
  }
  componentDidAppear () {
    console.log('mount Home')
  }
  componentWillMount () {
    this._loadInitialState()
  }
  async _loadInitialState () {
    const user = await AsyncStorage.getItem('me')
    this.setState({me: JSON.parse(user)})
    const assignedMuniciplaities = await api.get('locations/municipalities')

    console.log('assignedMuniciplaities', assignedMuniciplaities)

    this.setState({
      user,
      assignedMuniciplaities: assignedMuniciplaities.data
    })
  }
  logout () {
    const navigation = this.props.navigation
    AsyncStorage.removeItem('user')
    navigation.navigate('Login')
  }

  _onPress (e) {
    console.log(e)

    const navigation = this.props.navigation
    navigation.navigate('Detail', {municipality: e})
  }

  render () {
    let userName = ''
    console.log(this.state)

    let list = <FlatList data={this.state.assignedMuniciplaities} renderItem={({item}) => <TouchableOpacity style={styles.item}
      onPress={(e) => { this._onPress(item) }}>
      <View>
        <Text style={styles.itemName}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>} />

    if (this.state.me.user) {
      userName = this.state.me.user.screenName
    }
    return (
      <View behavior='padding' style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}>Welcome {userName}</Text>

          <TouchableOpacity style={styles.btn} onPress={(e) => { this.logout(e) }}>
            <Text>Logout</Text>
          </TouchableOpacity>

          {list}

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 4,
    paddingRight: 4
    // borderWidth: 8,
    // borderColor: 'blue'
  },
  item: {
    alignItems: 'center',
    width: 400,
    marginTop: 2,
    marginBottom: 2,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    paddingBottom: 10
    // fontWeight: 'bold'

  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 22

  },
  header: {
    fontSize: 24,
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
    width: 400,
    textAlign: 'right'

  },
  content: {
  },
  footer: {

  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#00c4a7',
    padding: 20,
    alignItems: 'center'
  }
})

export default Home
