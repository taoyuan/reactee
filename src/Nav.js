"use strict";

import React, {Component, PropTypes} from 'react';
import invariant from 'invariant';

export default class Nav extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    fullid: PropTypes.string,
    icon: PropTypes.any,
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    selected: PropTypes.bool,
    children: PropTypes.node,
  };
  //
  // static contextTypes = {
  //   parent: PropTypes.element
  // };
  //
  // static childContextTypes = {
  //   parent: PropTypes.element
  // };
  //
  // getChildContext() {
  //   return {
  //     parent: this
  //   }
  // }
  //
  // getFullid() {
  //   console.log(this.context);
  //   const {id} = this.props;
  //   const {parent} = this.context;
  //   return parent && parent.getFullid() ? parent.getFullid() + '.' + id : id;
  // }

  render() {
    invariant(
      false,
      '<Nav> elements are for SideBar configuration only and should not be rendered'
    )
  }
}
