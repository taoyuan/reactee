"use strict";

import React, {Component, PropTypes} from 'react';

import {noop, getNavs, isGroup, pick} from '../utils';
import Nav from './Nav';
import PrimaryPanel from './PrimaryPanel';
import SecondaryPanel from './SecondaryPanel';

function getStyles(props, context) {
  const {
    teeTheme: {
      sidebar,
      zIndex,
      fontFamily
    }
  } = context;

  return {
    root: {
      fontFamily: fontFamily,
      zIndex: zIndex.sidebar,
      width: sidebar.width,
      top: 0,
      left: 0,
      bottom: 0,
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'absolute',
      listStyle: 'none'
    }
  }
}

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

  static contextTypes = {
    teeTheme: PropTypes.object.isRequired,
  };

  state = {
    expandable: true
  };

  _navTimer;

  componentWillMount() {
  }

  updateExpandable(val) {
    this.setState({expandable: val});
  };

  delayUpdateExpandable(val, timeout) {
    this._navTimer = setTimeout(() => this.updateExpandable(val), timeout || 500);
  }

  handlePrimaryMouseEnter = (e) => {
    this.clearNavTimer();
    this.delayUpdateExpandable(false);
  };

  handleSecondaryMouseEnter = (e) => {
    this.clearNavTimer();
  };

  handleMouseLeave = (e) => {
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

    const expanded = expandable && selected && isGroup(selected);
    const settings = pick(this.props, 'icon', 'text', 'link');
    settings.expanded = expanded;

    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div style={populate(styles.root)}
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
