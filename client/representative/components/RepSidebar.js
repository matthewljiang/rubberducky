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
    marginLeft: 'auto', marginRight: 'auto', marginBottom: '.5em',
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
            <div>
              <FontAwesome name='envelope' fixedWidth/>
              <span style={{marginLeft:'.5em'}}>{this.props.info.email}</span>
            </div>
            <div>
              <FontAwesome name='phone' fixedWidth/>
              <span style={{marginLeft:'.5em'}}>{this.props.info.phone}</span>
            </div>
            <div>
              <FontAwesome name='facebook' fixedWidth/>
              <span style={{marginLeft:'.5em'}}>{this.props.info.facebook}</span>
            </div>
            <div>
              <FontAwesome name='twitter' fixedWidth/>
              <span style={{marginLeft:'.5em'}}>{this.props.info.twitter}</span>
            </div>
          </div>
        </div>
        );
  }
}

export default Radium(RepSidebar);
