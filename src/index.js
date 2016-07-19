import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './app';

// Needed for onTouchTap
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('root')
);
