"use strict";

import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';
import * as utils from '../utils';

import NavItem from './NavItem';

export default class SecondaryPanel extends Component {

  static propTypes = {
    navs: PropTypes.array.isRequired,
    visible: PropTypes.bool,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  handleNavItemClick = (owner, nav) => {
    const fullid = owner.props.id + '.' + nav.props.id;
    if (this.props.onSelect) {
      this.props.onSelect(fullid, nav);
    }
  };

  renderSecondaryList(owner) {
    const navs = utils.getNavs(owner);
    return (
      <Motion key={`secondary-${owner.props.id}`}
              style={{x: spring(owner.props.selected ? 0 : -184, {stiffness: 500, damping: 40})}}>
              {({x}) =>
                <div className={cx('nav-list nav-list--secondary', {
                  'nav-list--open': owner.props.selected
                })}
                     style={{
                       transform: `translate3d(${x}px, 0, 0)`
                     }}
                >
                  <li className="nav-item nav-item--header">
                    <h3 className="heading--callout">{owner.props.text}</h3>
                  </li>
                     {navs.map((nav, index) =>
                       <NavItem key={`primary-item-${index}`} nav={nav} onClick={(nav) => this.handleNavItemClick(owner, nav)}/>
                     )}
                </div>
              }
      </Motion>
    )
  }

  render() {
    const {navs, visible} = this.props;
    const settings = utils.pick(this.props, 'onMouseEnter', 'onMouseLeave');
    return (
      <Motion style={{x: spring(visible ? 56 : 240, {stiffness: 500, damping: 40})}}>
              {({x}) =>
                <div {...settings}
                     className="nav-panel nav-panel--secondary"
                     style={{
                       transform: `translate3d(${x}px, 0, 0)`
                     }}>
                     {navs.map(nav => utils.isGroup(nav) && this.renderSecondaryList(nav))}
                </div>
              }
      </Motion>
    )
  }
}
