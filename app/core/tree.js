import Baobab from 'baobab'
import { AsyncStorage } from 'react-native'

const initialState = {
  jwt: AsyncStorage.getItem('jwt')
}

const tree = new Baobab(initialState, {
  autoCommit: false,
  asynchronous: true,
  immutable: true
})

window.tree = tree

export default tree
