import React from 'react';
import App from 'next/app';
import withReduxStore from '../lib/redux-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

class _App extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withReduxStore(_App);