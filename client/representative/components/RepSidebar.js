import React from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';

import colors from '../../core/colors.js';

const styling = {
  container: {
    width: '23em',
    height: '100%',
    float: 'left',
    backgroundColor: colors.secondaryBackground,
    color: '#fff',
    position: 'relative'
  },
  infoHead: {
    marginTop: '1em',
    fontSize: '2em',
    textAlign: 'center'
  },
  infoFoot: {
    bottom: '0',
    position: 'fixed',
    marginBottom: '2em',
    marginLeft: '2em',
    fontSize: '1.2em',
  },
  imageContainer: {
    width: '8em', height: '8em',
    left: '0', right: '0',
    marginLeft: '1em', marginRight: '1em', marginBottom: '.5em',
    borderTopLeftRadius: '50% 50%', borderTopRightRadius: '50% 50%',
    borderBottomLeftRadius: '50% 50%', borderBottomRightRadius: '50% 50%',
    overflow: 'hidden',
  },
  profileImage: {
    width: '8em'
  }
}

class RepSidebar extends React.Component {
  render() {
    console.log(this.props);
    const info = this.props.info.social;
    const socialLinks = [];

    if (info.twitter) {
      socialLinks.unshift(
          <div key="twitter">
            <FontAwesome name='twitter' fixedWidth/>
            <span style={{marginLeft:'.5em'}}>{info.twitter}</span>
          </div>
          );
    }

    if (info.facebook) {
      socialLinks.unshift(
          <div key="facebook">
            <FontAwesome name='facebook' fixedWidth/>
            <span style={{marginLeft:'.5em'}}>{info.facebook}</span>
          </div>
          );
    }

    if (info.phone) {
      socialLinks.unshift(
          <div key="phone">
            <FontAwesome name='phone' fixedWidth/>
            <span style={{marginLeft:'.5em'}}>{info.phone}</span>
          </div>
          );
    }
    console.log(socialLinks);
    return (
        <div style={styling.container}>
          <div style={styling.infoHead}>
            <div style={styling.imageContainer}>
              <img src='https://s3.amazonaws.com/rubberducky/bernie.jpg' style={styling.profileImage}/>
            </div>
            <div>{this.props.info.name}</div>
            <div style={{fontSize:'.75em'}}>{this.props.info.party} - {this.props.info.state}</div>
          </div>
          <div style={styling.infoFoot}>
            {socialLinks}
            <div>
              <FontAwesome name='envelope' fixedWidth/>
              <span style={{marginLeft:'.5em'}}>{this.props.info.email}</span>
            </div>
          </div>
        </div>
        );
  }
}

export default Radium(RepSidebar);
