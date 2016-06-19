"use strict";

import React, {Component, PropTypes} from 'react';
import * as utils from '../utils';

import NavItem from './NavItem';

export default class PrimaryPanel extends Component {

  static propTypes = {
    navs: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  handleNavItemClick = (nav) => {
    if (this.props.onSelect) {
      this.props.onSelect(nav.props, nav);
    }
  };


  renderPrimaryHeader = () => {
    const {icon, text, link} = this.props;

    function renderLogo() {
      if (typeof icon === 'function') {
        return React.createElement(icon, {className: "nav-logo--img"});
      } else {
        return <img className="nav-logo--img" src={icon}/>;
      }
    }

    return (
      <header className="nav-logo">
        <a href={link}>
           {renderLogo()}
             <span className="nav-logo--text">{text}</span>
        </a>
      </header>
    )
  };

  render() {
    const {navs} = this.props;
    const settings = utils.pick(this.props, 'onMouseEnter', 'onMouseLeave');
    return (
      <div {...settings} className="nav-panel nav-panel--primary">
           {this.renderPrimaryHeader()}
           {navs.map((nav, index) =>
             <NavItem key={`primary-item-${index}`} nav={nav} onClick={this.handleNavItemClick}/>
           )}
      </div>
    )
  }
}
