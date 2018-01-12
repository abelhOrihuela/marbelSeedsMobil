import api from '../core/api'
import React from 'react'
import { Text,
  View,
  TextInput,
  TouchableOpacity,
  // AsyncStorage,
  StyleSheet
} from 'react-native'

class NewReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      municipality: {},
      reports: [],
      latitude: null,
      longitude: null,
      text: ''
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('latitude', position.coords.latitude)
        console.log('longitude', position.coords.longitude)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => console.log('No se pudo obtener tu localizacion' + error),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    )
  }

  componentWillMount () {
    const {state} = this.props.navigation
    console.log('state', state.params.municipality.uuid)
    this.setState({municipality: state.params.municipality})
    this._loadInitialState()
  }
  async _loadInitialState () {
    const reports = await api.get('reports')
    console.log('reports', reports)
    this.setState({
      reports
    })
  }

  async submitReport () {
    const {state} = this.props.navigation
    var data
    try {
      data = await api.post('reports',
        { 'description': this.state.text,
          'location': state.params.municipality.uuid,
          'geo': [this.state.latitude, this.state.longitude]
        })

      console.log(data)
      const navigation = this.props.navigation
      navigation.goBack()
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    console.log('state ==>', this.state)

    let municipalityName = this.state.municipality.name

    return (
      <View behavior='padding' style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}>
            New Report of {municipalityName}
          </Text>
          <TextInput multiline numberOfLines={2} style={styles.textInput} placeholder='Description' onChangeText={(text) => this.setState({text})} value={this.state.email} />
          <TouchableOpacity style={styles.btn} onPress={(e) => { this.submitReport(e) }}>
            <Text style={styles.textBtn}>Submit</Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
    // paddingLeft: 40,
    // paddingRight: 40
  },
  header: {
    fontSize: 24,
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
    width: 400,
    textAlign: 'center'
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

export default NewReport
