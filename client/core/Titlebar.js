import Radium from 'radium'
import React from 'react';
import colors from './colors.js';
import { Link } from 'react-router-dom';

const styling = {
  titlebar: {
    display: 'inline-flex',
    backgroundColor: colors.titlebarBackground,
    width: '100%',
    height: '3em',
    alignItems: 'center'
  },
  linkContainer: {},
  titlelink: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1.5em',
    margin: '0 1em',
    textTransform: 'lowercase',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  }

}

const TitlebarLink = Radium(React.createClass({
  render() {
    return (
        <div style={styling.linkContainer}>
          <Link to="/" style={styling.titlelink}>Home</Link>
        </div>
        );
  }
}));

const Titlebar = Radium(React.createClass({
  render() {
    return (
          <div style={styling.titlebar}>
            <TitlebarLink/>
            <TitlebarLink/>
          </div>
        );
  }
}));

export default Titlebar;
