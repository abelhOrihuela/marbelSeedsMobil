import api from '../core/api'
import React from 'react'
import { Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'

class Detail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  componentWillMount () {
    const {state} = this.props.navigation
    console.log('state', state.params)
  }

  render () {
    return (
      <View behavior='padding' style={styles.wrapper}>
        <Text>
          Detalle
        </Text>
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
  }
})

export default Detail
