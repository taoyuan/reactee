"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {TeeThemeProvider, SideBar, Nav, Spacer} from '../../src';

import {
  MdHome,
  MdDeviceHub,
  MdDevicesOther,
  MdApps,
  MdSettingsApplications
} from 'react-icons/lib/md'

class App extends Component {

  state = {
    select: 'home'
  };

  handleSelection = (fullid, nav) => {
    console.log(fullid);
    this.setState({select: fullid});
  };

  render() {
    const {select} = this.state;

    return (
      <TeeThemeProvider>
        <SideBar icon="icon.png" text='reactee' select={select} onSelect={this.handleSelection}>
          <Nav id="home" icon={MdHome} text="Home"/>
          <Nav id="hubs" icon={MdDeviceHub} text="Hubs"/>
          <Nav id="device" icon={MdDevicesOther} text="Devices"/>
          <Spacer/>
          <Nav id="apps" icon={MdApps} text="Applications">
            <Nav id="app1" text="Application"/>
          </Nav>
          <Nav id="settings" icon={MdSettingsApplications} text="Settings">
            <Nav id="api" text="API"/>
            <Nav id="account" text="Account"/>
            <Nav id="password" text="Password"/>
          </Nav>
        </SideBar>
      </TeeThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));
