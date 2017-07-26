import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
//import { SideMenu,Menu } from 'react-native-side-menu';
//import { Menu } from 'react-native-side-menu';
//const SideMenu = require('react-native-side-menu');
//AAPL,GOOG,GOOGL,YHOO,TSLA,INTC,AMZN,BIDU,ORCL,MSFT,ORCL,ATVI,NVDA,GME,LNKD,NFLX
import { ScrollView } from 'react-native';
import { Button, SideMenu, Menu, List, ListItem, ButtonGroup, SearchBar, CheckBox } from 'react-native-elements';
import Table from 'react-native-simple-table';
import Chart from 'react-native-chart';
import RNChart from 'react-native-chart';

const list = [
      {
        name: "Amy Farha",
        avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        subtitle: "Vice President"
      },
      {
        name: "Chris Jackson",
        avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: "Vice Chairman"
      },
      {
        name: "Amanda Martin",
        avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg",
        subtitle: "CEO"
      },
      {
        name: "Christy Thomas",
        avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg",
        subtitle: "Lead Developer"
      },
      {
        name: "Melissa Jones",
        avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg",
        subtitle: "CTO"
      },
      {
        name: "Melissa Jones",
        avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg",
        subtitle: "CTO"
      },
      {
        name: "Melissa Jones",
        avatar_url: "https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg",
        subtitle: "CTO"
      }
];


export default class SideMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'SideMenuScreen',
  };
  constructor(props) {
    super(props);
    //this.state = { loading: false };
    //this.state = { toggled: false };
    this.state = {
      isOpen: false
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }
  onSideMenuChange (isOpen: boolean) {
    this.setState({
      isOpen: isOpen
    })
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }


render () {
  const MenuComponent = (
    <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
      <List containerStyle={{marginBottom: 20}}>
      {
        list.map((l, i) => (
          <ListItem
            roundAvatar
            onPress={() => console.log('Pressed')}
            avatar={l.avatar_url}
            key={i}
            title={l.name}
            subtitle={l.subtitle}
          />
        ))
      }
      </List>
    </View>
  )

  return (
      <SideMenu
        isOpen={this.state.isOpen}
        onChange={this.onSideMenuChange.bind(this)}
        menu={MenuComponent}>
      </SideMenu>
    )
  }
}