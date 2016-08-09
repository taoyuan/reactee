"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
  TeeThemeProvider, SideBar, Header, Nav, Spacer, FlexSpacer, Footer,
  FooterMenuSection, FooterMenuItem, Divider
} from '../../src';

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
        <SideBar select={select} onSelect={this.handleSelection}>
          <Header icon="icon.png" text='Reactee' onClick={() => alert("I'm Reactee")}/>
          <Nav id="home" icon={MdHome} text="主页"/>
          <Nav id="hubs" icon={MdDeviceHub} text="Hubs"/>
          <Nav id="device" icon={MdDevicesOther} text="Devices"/>
          <FlexSpacer/>
          <Divider/>
          <Nav id="apps" icon={MdApps} text="Applications">
            <Nav id="app1" text="Application"/>
          </Nav>
          <Nav id="settings" icon={MdSettingsApplications} text="Settings">
            <Nav id="api" text="API"/>
            <Nav id="account" text="Account"/>
            <Nav id="password" text="Password"/>
          </Nav>
          <Divider/>
          <Footer avatarText="Tao Yuan" text="Reactee" subText="Tao Yuan">
            <FooterMenuSection>
              <FooterMenuItem text="Your Profile"/>
              <FooterMenuItem text="Log Out"/>
            </FooterMenuSection>
          </Footer>
        </SideBar>
      </TeeThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));
