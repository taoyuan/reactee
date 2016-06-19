"use strict";

import React, {Component, PropTypes, Children} from 'react';
import cx from 'classnames';

import {noop, getNavs, isGroup, pick} from './utils';
import Nav from './Nav';
import PrimaryPanel from './components/PrimaryPanel';
import SecondaryPanel from './components/SecondaryPanel';

export default class SideBar extends Component {

  static propTypes = {
    // header settings
    icon: PropTypes.any,
    text: PropTypes.string,
    link: PropTypes.string,
    //
    navs: PropTypes.array,
    children: PropTypes.node,
    select: PropTypes.string,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    text: 'Reactee',
    link: '#',
    onSelect: noop
  };

  state = {
    expandable: true
  };

  _navTimer;

  updateExpandable(val) {
    this.setState({expandable: val});
  };

  delayUpdateExpandable(val, timeout) {
    this._navTimer = setTimeout(() => this.updateExpandable(val), timeout || 500);
  }

  handlePrimaryMouseEnter = (e) => {
    e && e.stopPropagation();
    this.clearNavTimer();
    this.delayUpdateExpandable(false);
  };

  handleSecondaryMouseEnter = (e) => {
    e && e.stopPropagation();
    this.clearNavTimer();
  };

  handleMouseLeave = (e) => {
    e && e.stopPropagation();
    this.clearNavTimer();
    this.delayUpdateExpandable(true);
  };

  clearNavTimer() {
    if (this._navTimer) {
      clearTimeout(this._navTimer);
      this._navTimer = null;
    }
  }

  handleSelect = (fullid, nav) => {
    this.clearNavTimer();
    this.updateExpandable(true);
    this.props.onSelect(fullid, nav);
  };

  renderNavs(navs, select) {
    if (!navs) {
      return navs;
    }

    const selectToUse = select && select.toLowerCase();

    return navs.map((nav, index) => {
      if (nav.type !== Nav) {
        return nav;
      }

      let s = nav.props.id.toLowerCase();
      if (selectToUse !== s) {
        s += '.';
      }
      // select default index 0 if no selection
      const selected = selectToUse ? selectToUse.indexOf(s) === 0 : index === 0;

      let children = getNavs(nav);
      if (selected && isGroup(nav)) {
        children = this.renderNavs(children, select.substr(s.length));
      }

      return React.cloneElement(nav, {
        key: nav.props.id,
        selected: selected,
      }, children);
    });
  }

  render() {
    const {select, children}  = this.props;
    const {expandable} = this.state;

    const navs = this.renderNavs(getNavs(children), select);
    const selected = navs.find(nav => nav.props.selected);

    const settings = pick(this.props, 'icon', 'text', 'link');
    const expanded = expandable && selected && isGroup(selected);

    return (
      <div className={cx("sidebar", {
        'nav-panel--expanded': expanded
      })}
           onMouseLeave={this.handleMouseLeave}>
        <PrimaryPanel {...settings}
                      navs={navs}
                      onSelect={this.handleSelect}
                      onMouseEnter={this.handlePrimaryMouseEnter}
        />
        <SecondaryPanel navs={navs}
                        visible={expanded}
                        onSelect={this.handleSelect}
                        onMouseEnter={this.handleSecondaryMouseEnter}/>
      </div>
    );
  }
}
