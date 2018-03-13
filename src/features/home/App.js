import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const getTheme = () => {
  let overwrites = {
    "palette": {
        "accent1Color": Colors.blueGrey500,
        "accent2Color": Colors.blueGrey700,
        "accent3Color": Colors.blueGrey800,
        "primary1Color": Colors.blueGrey700,
        "primary2Color": Colors.blueGrey700,
        "pickerHeaderColor": Colors.blueGrey300,
        "textColor": Colors.black
      }
  };
  return getMuiTheme(baseTheme, overwrites);
}

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
        <MuiThemeProvider muiTheme={getTheme()}>
            <div className="home-app">
                {this.props.children}
            </div>
        </MuiThemeProvider>
    );
  }
}
