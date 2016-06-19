"use strict";

import React, {Component, PropTypes, Children} from 'react';
import cx from 'classnames';

import * as utils from './utils';
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
    selected: PropTypes.string,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    text: 'Reactee',
    link: '#'
  };

  state = {
    expandable: true
  };

  _navTimer;

  isSelected(nav, id) {
    id = id === undefined ? this.props.selected : id;
    return nav.props.id === id;
  }

  getNavs() {
    return utils.getNavs(this.props.children);
  }

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

  handleSelection = (...args) => {
    this.clearNavTimer();
    this.updateExpandable(true);
    if (this.props.onSelect) {
      this.props.onSelect(...args);
    }
  };

  render() {
    let selected;
    const navs = this.getNavs().map(nav => {
      if (this.isSelected(nav)) {
        selected = nav;
      }
      return React.cloneElement(nav, {
        selected: selected === nav
      });
    });

    const settings = utils.pick(this.props, 'icon', 'text', 'link');

    const {expandable} = this.state;
    const expanded = expandable && selected && utils.isGroup(selected);

    return (
      <div className={cx("sidebar", {
        'nav-panel--expanded': expanded
      })}
           onMouseLeave={this.handleMouseLeave}>
        <PrimaryPanel {...settings}
                      navs={navs}
                      onSelect={this.handleSelection}
                      onMouseEnter={this.handlePrimaryMouseEnter}
        />
        <SecondaryPanel navs={navs}
                        visible={expanded}
                        onSelect={this.handleSelection}
                        onMouseEnter={this.handleSecondaryMouseEnter}/>
      </div>
    );
  }
}
