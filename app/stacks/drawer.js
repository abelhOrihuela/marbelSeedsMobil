import {DrawerNavigator} from 'react-navigation'
import Login from '../pages/Login'
import Home from '../pages/Home'
import NewReportMap from '../pages/NewReportMap'
import DetailReport from '../pages/DetailReport'
import NewReport from '../pages/NewReport'
import Reports from '../pages/Reports'

const Drawer = DrawerNavigator({
  Login: {screen: Login},
  Home: {screen: Home},
  Reports: {screen: Reports},
  NewReportMap: {screen: NewReportMap},
  DetailReport: {screen: DetailReport},
  NewReport: {screen: NewReport}
}, {
  headerMode: 'none'
})

export default Drawer
