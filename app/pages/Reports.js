import api from '../core/api'
import React from 'react'
import { Text,
  View,
  // TextInput,
  TouchableOpacity,
  // AsyncStorage,
  StyleSheet,
  FlatList
} from 'react-native'

import Moment from 'moment'

class Reports extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      municipality: {},
      reports: [],
      refreshing: true
    }
  }
  componentWillMount () {
    const {state} = this.props.navigation
    console.log('municipality', state.params.municipality)
    this.setState({municipality: state.params.municipality})
    this._loadInitialState()
  }
  async _loadInitialState () {
    const {state} = this.props.navigation
    console.log('municipality', state.params.municipality)

    try {
      const reports = await api.get('reports', { location: state.params.municipality.uuid })
      this.setState({
        reports: reports,
        refreshing: false
      })
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  newReport () {
    const navigation = this.props.navigation
    navigation.navigate('NewReport', {municipality: this.state.municipality})
  }

  _onPress (item) {
    const navigation = this.props.navigation
    console.log('item', item)
    navigation.navigate('DetailReport', {report: item})
  }

  handleRefresh () {
    console.log('refresh')
    this.setState({
      refreshing: true
    }, () => {
      this._loadInitialState()
    })
  }

  render () {
    let municipalityName = this.state.municipality.name
    console.log('reports', this.state.reports.data)
    let list =
      <FlatList data={this.state.reports.data}
        keyExtractor={(x, i) => i}
        refreshing={this.state.refreshing}
        onRefresh={(e) => { this.handleRefresh(e) }}
        renderItem={({item}) =>
          <TouchableOpacity style={styles.item}
            onPress={(e) => { this._onPress(item) }}>
            <View>
              <Text style={styles.itemName}>
                {item.description}
              </Text>
              <Text style={styles.itemDate}>
                {Moment(item.dateCreated).format('d MMM YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
    } />

    return (
      <View behavior='padding' style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}>
            { municipalityName }
          </Text>
          {list}
          <TouchableOpacity style={styles.btn} onPress={(e) => { this.newReport(e) }} >
            <Text style={styles.textBtn}>New Report</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10
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
    alignItems: 'center',
    marginBottom: 5
  },
  item: {
    // alignItems: 'center',
    width: 400,
    marginTop: 2,
    marginBottom: 2,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    paddingBottom: 10
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 22
  },
  itemDate: {
    fontWeight: 'bold',
    fontSize: 10

  },
  textBtn: {
    color: 'white'
  }
})

export default Reports
