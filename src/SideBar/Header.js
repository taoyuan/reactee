"use strict";

import React, {Component, PropTypes} from 'react';
import {noop} from '../utils';

function getStyles(props, context) {
  const {expanded} = props;
  const {
    teeTheme: {
      sidebar,
    }
  } = context;

  return {
    headerLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: sidebar.headerColor,
      borderBottom: '1px solid transparent',
      minHeight: sidebar.headerHeight,
      paddingLeft: sidebar.indent - (sidebar.headerImageSize - sidebar.itemIconSize) / 2,
      transition: 'background-color 200ms ease 0s'
    },
    headerImage: {
      flex: 'initial',
      width: 'auto',
      height: sidebar.headerImageSize
    },
    headerText: {
      flex: 1,
      marginTop: 4,
      color: sidebar.headerTextColor,
      fontSize: 18,
      transition: 'transform 200ms ease, opacity 200ms ease',
      transform: expanded ? 'translateX(-15px)' : null,
      opacity: expanded ? 0 : 1
    }
  }
}

export default class Header extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    link: PropTypes.string,
    icon: PropTypes.any,
    iconStyles: PropTypes.object,
    text: PropTypes.string,
    textStyles: PropTypes.object,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: noop
  };

  static contextTypes = {
    teeTheme: PropTypes.object.isRequired,
  };

  renderLogo(styles) {
    const {icon, iconStyles} = this.props;
    const {populate} = this.context.teeTheme;
    if (icon) {
      if (typeof icon === 'function') {
        return React.createElement(icon, {style: populate(styles.headerImage)});
      }
      return <img style={populate({}, styles.headerImage, iconStyles)} src={icon}/>;
    }
  }

  renderText(styles) {
    const {text, textStyles} = this.props;
    const {populate} = this.context.teeTheme;
    if (text) {
      return <span style={populate({}, styles.headerText, textStyles)}>{text}</span>;
    }
  }

  render() {
    const {link, onClick} = this.props;

    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <header style={populate(styles.header)} onClick={onClick}>
        <a href={link} style={populate(styles.headerLink)}>
          {this.renderLogo(styles)}
          {this.renderText(styles)}
        </a>
      </header>
    )
  }
}
