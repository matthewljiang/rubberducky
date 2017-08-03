import React from 'react';
import Radium from 'radium';
import axios from 'axios';

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
    display: 'flex',
    flexFlow: 'column',
    bottom: '0',
    margin: '1em',
    fontSize: '1.1em',
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
  },
  contact: {
    display: 'flex',
    alignItems: 'center'
  }
}

function validSocials(info) {
  const socialLinks = [];

  if (info.phone) {
    socialLinks.push(
        <div key="phone" style={styling.contact}>
          <FontAwesome name='phone' fixedWidth/>
          <span style={{marginLeft:'.5em'}}>{info.phone}</span>
        </div>
        );
  }
  if (info.url) {
    socialLinks.push(
        <div key="url" style={styling.contact}>
          <FontAwesome name='globe' fixedWidth/>
          <span style={{marginLeft:'.5em'}}>{info.url}</span>
        </div>
        );
  }
  if (info.twitter) {
    socialLinks.push(
        <div key="twitter" style={styling.contact}>
          <FontAwesome name='twitter' fixedWidth/>
          <span style={{marginLeft:'.5em'}}>{info.twitter}</span>
        </div>
        );
  }
  if (info.instagram) {
    socialLinks.push(
        <div key="twitter" style={styling.contact}>
          <FontAwesome name='instagram' fixedWidth/>
          <span style={{marginLeft:'.5em'}}>{info.instagram}</span>
        </div>
        );
  }
  if (info.facebook) {
    socialLinks.push(
        <div key="facebook" style={styling.contact}>
          <FontAwesome name='facebook' fixedWidth/>
          <span style={{marginLeft:'.5em'}}>{info.facebook}</span>
        </div>
        );
  }

  return socialLinks;
}

class LegislatorSidebar extends React.Component {
  like() {
    axios.post('/api/approval/like', {
        bioguide: this.props.info.bioguide
    }).then((response) => {
      console.log(response);
    });
  }

  dislike() {
    axios.post('/api/approval/dislike', {
      bioguide: this.props.info.bioguide
    }).then((response) => {
      console.log(response);
    });
  }

  render() {
    const socialLinks = validSocials(this.props.info.social);
    return (
        <div style={styling.container}>
          <div style={styling.infoHead}>
            <div style={styling.imageContainer}>
              <img src='https://s3.amazonaws.com/rubberducky/person.jpg' style={styling.profileImage}/>
            </div>
            <div>{this.props.info.position}</div>
            <div>{this.props.info.name}</div>
            <div style={{fontSize:'.75em'}}>{this.props.info.party} - {this.props.info.state}</div>
          </div>
          <div style={styling.infoFoot}>
            {socialLinks}
          </div>
        </div>
        );
  }
}

export default Radium(LegislatorSidebar);
