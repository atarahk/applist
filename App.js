import React, { Component } from 'react'
import { NetInfo, Alert } from 'react-native'
import { Provider } from 'react-redux'

import store from './src/redux/stores/index'
import MainScreen from './src/components/MainScreen'

class App extends Component {
  state = {
    isConnected: true
  }

  handleConnectionChange = connectionInfo => {
    console.log('connection info: ', connectionInfo)
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected: isConnected })
      console.log('network status: ' + isConnected)
    })
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange)
  }

  componentDidUpdate() {
    // Expo runs a bit latency while clicking the button on the popup alert on IOS simulator,
    // should be ok on physical device.
    if (this.state.isConnected === false) {
      Alert.alert(
        `Network Status`,
        `You're Currently Offline, Please Try Again Later.`,
        [{ text: 'OK', onPress: () => console.log('Try Later') }],
        { cancelable: true }
      )
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    )
  }

  render() {
    return (
      <Provider store={store}>
        <MainScreen style={{ flex: 1 }} />
      </Provider>
    )
  }
}

export default App
