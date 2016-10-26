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
    }
  }
}

export default class PrimaryPanel extends Component {

  static propTypes = {
    style: PropTypes.object,
    header: PropTypes.element,
    footer: PropTypes.element,
    items: PropTypes.array.isRequired,
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

  render() {
    const {style, header, footer, items, expanded} = this.props;
    const settings = pick(this.props, 'onMouseEnter', 'onMouseLeave');
    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context);
    return (
      <div {...settings} style={populate({}, styles.root, style)}>
        {header}
        {items.map((item, index) =>
          <NavItem key={`primary-item-${index}`} item={item} expanded={expanded} onClick={this.handleNavItemClick}/>
        )}
        {footer}
      </div>
    )
  }
}
