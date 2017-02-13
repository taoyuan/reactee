"use strict";

import React, {Component, PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
import {getItems, pick, isGroup} from '../utils';

import NavItem from './NavItem';

function getStyles(props, context) {
  const {
    teeTheme: {
      sidebar,
      zIndex,
    }
  } = context;

  const width = sidebar.width - sidebar.collapseWidth;

  return {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      overflowX: 'hidden',
      overflowY: 'auto',

      width: width,
      zIndex: zIndex.sidebarSecondaryPanel,
      backgroundColor: sidebar.panelColor
    },
    header: {
      height: sidebar.headerHeight,
      padding: `0 10px 0 ${sidebar.indent}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      borderBottom: `1px solid ${sidebar.headerColor}`
    },
    heading: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'uppercase',
      color: sidebar.itemTextColor,
      flex: 1
    },
    list: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      position: 'absolute',
      width: width,
      display: 'none'
    },
    listOpen: {
      display: 'block',
      transform: 'translate3d(0, 0, 0)'
    }
  }
}

export default class SecondaryPanel extends Component {

  static propTypes = {
    style: PropTypes.object,
    items: PropTypes.array.isRequired,
    visible: PropTypes.bool,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  static contextTypes = {
    teeTheme: PropTypes.object.isRequired,
  };

  handleNavItemClick = (owner, item) => {
    const fullid = owner.props.id + '.' + item.props.id;
    if (this.props.onSelect) {
      this.props.onSelect(fullid, item);
    }
  };

  renderSecondaryList(owner, styles) {
    const items = getItems(owner);
    const {populate, sidebar} = this.context.teeTheme;
    return (
      <Motion key={`secondary-${owner.props.id}`}
              style={{
                x: spring(
                  owner.props.selected ? 0 : -(sidebar.width - sidebar.collapseWidth),
                  {stiffness: 500, damping: 40}
                )
              }}>
        {({x}) =>
          <div
            style={populate({}, styles.list, owner.props.selected ? styles.listOpen : null, {
              transform: `translate3d(${x}px, 0, 0)`
            })}
          >
            <li style={populate({}, styles.header)}>
              <h6 style={populate({}, styles.heading)}>{owner.props.title || owner.props.text}</h6>
            </li>
            {items.map((item, index) =>
              <NavItem key={`primary-item-${index}`} item={item}
                       onClick={(item) => this.handleNavItemClick(owner, item)}/>
            )}
          </div>
        }
      </Motion>
    )
  }

  render() {
    const {style, items, visible} = this.props;
    const settings = pick(this.props, 'onMouseEnter', 'onMouseLeave');
    const {populate, sidebar} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context);
    return (
      <Motion style={{x: spring(visible ? sidebar.collapseWidth : sidebar.width, {stiffness: 500, damping: 40})}}>
        {({x}) =>
          <div {...settings}
               style={populate({}, styles.root, {
                 transform: `translate3d(${x}px, 0, 0)`
               }, style)}>
            {items.map(item => isGroup(item) && this.renderSecondaryList(item, styles))}
          </div>
        }
      </Motion>
    )
  }
}
