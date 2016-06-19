"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {SideBar, Nav, Spacer} from '../../src';

import {
  MdHome,
  MdDeviceHub,
  MdDevicesOther,
  MdApps,
  MdSettingsApplications
} from 'react-icons/lib/md'

class App extends Component {

  state = {
    selected: 'home'
  };

  handleSelection = (item) => {
    this.setState({selected: item.id});
  };

  render() {
    const {selected} = this.state;

    return (
      <SideBar icon="icon.png" selected={selected} onSelect={this.handleSelection}>
        <Nav id="home" icon={MdHome} text="主页"/>
        <Spacer/>
        <Nav id="hubs" icon={MdDeviceHub} text="Hubs" url="bing.com"/>
        <Nav id="device" icon={MdDevicesOther} text="设备"/>
        <Spacer/>
        <Nav id="apps" icon={MdApps} text="应用">
          <Nav id="app1" text="应用1"/>
        </Nav>
        <Nav id="settings" icon={MdSettingsApplications} text="设置">
          <Nav id="api" text="API"/>
          <Nav id="account" text="账户"/>
          <Nav id="password" text="密码"/>
        </Nav>
      </SideBar>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));
