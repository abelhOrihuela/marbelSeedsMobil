import api from '../core/api'
import React from 'react'
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, Keyboard,ActivityIndicator} from 'react-native'
import { NavigationActions } from 'react-navigation'

class Login extends React.Component {
  static navigationOptions = {
         header: null,
         drawerLabel: () => null
  }

  constructor (props) {
    super(props)
    this.state = {
      email: 'abel@commonsense.io',
      password: 'abel',
      loading: false
    }
  }

  componentWillMount () {
    console.log('componentWillMount...')
    this.loadInitialState()
  }

  async loadInitialState () {
    console.log('loadInitialState...')
    try {
      const value = await AsyncStorage.getItem('user')
      console.log('value', value)
      if (value !== null) {
        this.me()
      }
    } catch (error) {
    }
  }

  async me () {
    console.log('me...')
    var data
    try {
      data = await api.get('user/me')
      await AsyncStorage.setItem('me', JSON.stringify(data))
      console.log('data ==============>', data)
      console.log('this.props', this.props)
      this.setState({loading: false})
      this.props.navigation.navigate('Home')
    } catch (e) {
    }
  }

  async login () {
    var data
    this.setState({loading: true})
    try {
      data = await api.post('user/login', { 'email': this.state.email, 'password': this.state.password })
      await AsyncStorage.setItem('user', JSON.stringify(data))
      await AsyncStorage.setItem('jwt', JSON.stringify(data.jwt))
      Keyboard.dismiss()
      await this.me()
    } catch (e) {
      this.setState({loading: false})
    }
  }

  getStatus () {
    if (this.state.loading) {
      return (<ActivityIndicator size="large" color="#0000ff" />)
    } else {
      return (<TouchableOpacity style={styles.btn} onPress={(e) => { this.login(e) }}>
        <Text style={styles.textBtn}>Login</Text>
      </TouchableOpacity>)
  }
}

  render () {
    return (
      <View behavior='padding' style={styles.wrapper}>

        <View style={styles.container}>
          <Text style={styles.header}>Login</Text>
          <TextInput style={styles.textInput} placeholder='Email' onChangeText={(email) => this.setState({email})} value={this.state.email} />
          <TextInput style={styles.textInput} placeholder='Password' onChangeText={(password) => this.setState({password})} value={this.state.password} secureTextEntry />
          {this.getStatus()}
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
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 40,
    paddingRight: 40
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold'
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
  },
  textBtn: {
    color: 'white'
  }
})

export default Login
