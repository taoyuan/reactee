"use strict";

import React, {Component, PropTypes} from 'react';
import {pick} from '../utils';

import NavItem from './NavItem';

function getStyles(props, context) {
  const {expanded} = props;
  const {
    teeTheme: {
      sidebar,
      zIndex,
    }
  } = context;

  return {
    root: {
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      overflowX: 'hidden',
      overflowY: 'auto',

      zIndex: zIndex.sidebarPrimaryPanel,
      backgroundColor: expanded ? sidebar.collapsedPanelColor : sidebar.panelColor,
      display: 'flex',
      flexDirection: 'column',
      transition: 'background-color 200ms ease'
    },
    headerLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      textDecoration: 'none',
    },
    headerLogo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: sidebar.headerColor,
      borderBottom: '1px solid transparent',
      height: sidebar.headerHeight,
      paddingLeft: sidebar.indent - (sidebar.headerLogoImageSize - sidebar.itemIconSize) / 2,
      transition: 'background-color 200ms ease 0s'
    },
    headerLogoImage: {
      flex: 'initial',
      width: 'auto',
      height: sidebar.headerLogoImageSize
    },
    headerLogoText: {
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

export default class PrimaryPanel extends Component {

  static propTypes = {
    navs: PropTypes.array.isRequired,
    expanded: PropTypes.bool,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  static contextTypes = {
    teeTheme: PropTypes.object.isRequired,
  };

  handleNavItemClick = (nav) => {
    if (this.props.onSelect) {
      this.props.onSelect(nav.props.id, nav);
    }
  };

  renderPrimaryHeader = (populate, styles) => {
    const {icon, text, link} = this.props;

    function renderLogo() {
      if (typeof icon === 'function') {
        return React.createElement(icon, {style: populate(styles.headerLogoImage)});
      } else {
        return <img style={populate(styles.headerLogoImage)} src={icon}/>;
      }
    }

    return (
      <header style={populate(styles.headerLogo)}>
        <a href={link} style={populate(styles.headerLink)}>
           {renderLogo()}
             <span style={populate(styles.headerLogoText)}>{text}</span>
        </a>
      </header>
    )
  };

  render() {
    const {navs, expanded} = this.props;
    const settings = pick(this.props, 'onMouseEnter', 'onMouseLeave');
    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context);
    return (
      <div {...settings} style={populate(styles.root)}>
           {this.renderPrimaryHeader(populate, styles)}
           {navs.map((nav, index) =>
             <NavItem key={`primary-item-${index}`} nav={nav} expanded={expanded} onClick={this.handleNavItemClick}/>
           )}
      </div>
    )
  }
}
