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
  }

}

class TitlebarLink extends React.Component {
  render() {
    return (
        <div style={styling.linkContainer}>
          <Link to={this.props.dest} style={styling.titlelink}>{this.props.text}</Link>
        </div>
        );
  }
};
TitlebarLink = Radium(TitlebarLink);

class Titlebar extends React.Component {
  render() {
    return (
        <div style={styling.titlebar}>
          <TitlebarLink dest={"/"} text={"home"}/>
          <TitlebarLink dest={"/representatives"} text={"reps"}/>
        </div>
        );
  }
};

export default Radium(Titlebar);
