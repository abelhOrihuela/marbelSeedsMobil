// import api from '../core/api'
import apiMaps from '../core/api-maps'
import React from 'react'
import Mapbox from '@mapbox/react-native-mapbox-gl'
// import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27
import { Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native'

Mapbox.setAccessToken('pk.eyJ1IjoiYWJlbGhjcyIsImEiOiJjamU0czlrbXAyYXprMndxbDFnZ2tvdjVxIn0.QQe8o1dfVO3mW6QCMaodRQ')

class NewReportMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      municipality: {},
      reports: [],
      latitude: null,
      longitude: null,
      text: '',
      dataLocations: {
        features: []
      },
      currentPositionOfMap: [-459.1392517089844, 19.43421929772403]
    }
  }

  async onChangeSearch (text) {
    if (text.text.length > 2) {
      var dataLocations = await apiMaps.get(`mapbox.places/${text.text}.json`)
      this.setState({dataLocations: dataLocations})
    } else {
      this.setState({dataLocations: {
        features: []
      }})
    }
  }

  selectLocationOfSearch (item) {
    this.setState({currentPositionOfMap: item.geometry.coordinates})
  }

  getAnnotation () {
    return (<Mapbox.PointAnnotation
      key='pointAnnotation'
      id='pointAnnotation'
      coordinate={this.state.currentPositionOfMap}>
      <View style={styles.annotationContainer}>
        <View style={styles.annotationFill} />
      </View>
      <Mapbox.Callout title='Look! An annotation!' />
    </Mapbox.PointAnnotation>)
  }

  getListLocations () {
    if (this.state.dataLocations.features.length > 0) {
      return (<View style={{flex: 2, flexDirection: 'row'}}>
        <FlatList data={this.state.dataLocations.features}
          keyExtractor={(x, i) => i}
          renderItem={({item}) =>
            <TouchableOpacity style={styles.item}
              onPress={(e) => { this.selectLocationOfSearch(item) }}>
              <View>
                <Text style={styles.itemName}>
                  {item.place_name}
                </Text>
              </View>
            </TouchableOpacity>
        } />
      </View>)
    }
  }

  render () {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        <TextInput onChangeText={(text) => this.onChangeSearch({text})} style={styles.textInput} />
        {this.getListLocations()}
        <View style={{flex: 2, flexDirection: 'row', backgroundColor: 'blue'}}>
          <Mapbox.MapView
            styleURL={'mapbox://styles/abelhcs/cje7fpjnv40u12rpipr0ef13n'}
            zoomLevel={8}
            style={styles.container}
            showUserLocation
            logoEnabled
            rotateEnabled={false}>
            {this.getAnnotation()}
          </Mapbox.MapView>
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
    borderColor: '#444',
    borderRadius: 10,
    margin: 10,
    shadowColor: 'gray'
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#00c4a7',
    padding: 20,
    alignItems: 'center'
  },
  textBtn: {
    color: 'white'
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0'
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 15
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  },
  annotationFillRed: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    transform: [{ scale: 0.6 }]
  },
  annotationFillBlue: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    transform: [{ scale: 0.6 }]
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }]
  }
})

export default NewReportMap
