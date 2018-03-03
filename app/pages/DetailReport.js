import api from '../core/api'
import React from 'react'
import { Text,
  View,
  StyleSheet
} from 'react-native'
import Moment from 'moment'

class DetailReport extends React.Component {
  static navigationOptions = {
         drawerLabel: () => null
  }
  constructor (props) {
    super(props)
    this.state = {
      report: {}
    }
  }

  componentWillMount () {
    const {state} = this.props.navigation
    console.log('params', state.params)
    this.setState({report: state.params.report})
    // this._loadInitialState()
  }
  async _loadInitialState () {
    const reports = await api.get('reports')
    console.log('reports', reports)
    this.setState({
      reports
    })
  }

  render () {
    console.log('state ==>', this.state)

    let report = this.state.report

    return (
      <View behavior='padding' style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Detail Report of { report.location }
          </Text>
          <Text style={styles.header}>
            { report.organization }
          </Text>
          <Text style={styles.header}>
            { report.user }
          </Text>
          <Text style={styles.header}>
            {Moment(report.dateCreated).format('d MMM YYYY')}
          </Text>
          <Text style={styles.header}>
            { report.description }
          </Text>
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
  }
})

export default DetailReport
