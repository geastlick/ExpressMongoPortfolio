import React from 'react';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import { AppContainer } from './components/AppContainer';

const store = ConfigureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>);
  }
}
