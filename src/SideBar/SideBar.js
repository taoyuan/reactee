"use strict";

import React, {Component, PropTypes} from 'react';
import warning from "warning";

import {noop, getItems, isGroup, pick} from '../utils';

import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Divider from './Divider';
import Spacer from './Spacer';
import FlexSpacer from './FlexSpacer';

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
      fontSize: 14,
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
    link: PropTypes.string,
    text: PropTypes.string,
    //
    style: PropTypes.object,
    primaryStyle: PropTypes.object,
    secondaryStyle: PropTypes.object,
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
    this.clearNavTimer();
    this._navTimer = setTimeout(() => this.updateExpandable(val), timeout || 500);
  }

  handlePrimaryMouseEnter = (e) => {
    this.delayUpdateExpandable(false);
  };

  handleSecondaryMouseEnter = (e) => {
    this.clearNavTimer();
  };

  handleMouseLeave = (event) => {
    const root = this.refs.sidebar;
    //this is the original element the event handler was assigned to
    let e = event.toElement || event.relatedTarget;

    //check for all children levels (checking from bottom up)
    while (e && e.parentNode && e.parentNode != window) {
      if (e.parentNode == root || e == root) {
        if (e.preventDefault) e.preventDefault();
        return false;
      }
      e = e.parentNode;
    }

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

  handelFooterClick = () => {
    // disable expandable
    this.updateExpandable(false);
  };

  parseChildren(children) {
    const VLAID_CHILDREN = [Header, Footer, Nav, Divider, Spacer, FlexSpacer];
    let header, footer, items = [];

    React.Children.forEach(children, (item, index) => {
      if (React.isValidElement(item)) {

        warning(VLAID_CHILDREN.indexOf(item.type) >= 0,
          `SideBar only accepts Header, Footer and Nav Components as children. 
          Found '${item.type.name}' as child number ${index + 1} of SideBar`);

        if (item.type === Header) {
          header = item;
        } else if (item.type === Footer) {
          footer = item;
        } else {
          items.push(item);
        }
      }
    });

    return {header, footer, items};
  }

  renderItems(navs, select) {
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

      const selected = selectToUse && selectToUse.indexOf(s) === 0;

      let children = getItems(nav);
      if (selected && isGroup(nav)) {
        children = this.renderItems(children, select.substr(s.length));
      }

      return React.cloneElement(nav, {
        key: nav.props.id,
        selected: selected,
      }, children);
    });
  }

  render() {
    const {select, children, style, primaryStyle, secondaryStyle}  = this.props;
    const {expandable} = this.state;

    let {header, footer, items} = this.parseChildren(children);
    items = this.renderItems(items, select);

    const selected = items.find(nav => nav.props.selected);
    const expanded = expandable && selected && isGroup(selected);

    if (header) header = React.cloneElement(header, {expanded: expanded});
    if (footer) footer = React.cloneElement(footer, {expanded: expanded, onClick: this.handelFooterClick});

    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div ref="sidebar"
           style={populate({}, styles.root, style)}
           onMouseLeave={this.handleMouseLeave}>
        <PrimaryPanel
          style={primaryStyle}
          expanded={expanded}
          header={header}
          footer={footer}
          items={items}
          onSelect={this.handleSelect}
          onMouseEnter={this.handlePrimaryMouseEnter}
        />
        <SecondaryPanel
          style={secondaryStyle}
          items={items}
          visible={expanded}
          onSelect={this.handleSelect}
          onMouseEnter={this.handleSecondaryMouseEnter}/>
      </div>
    );
  }
}
