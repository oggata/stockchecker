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

import HomeScreen from './js/HomeScreen';
import ChartScreen from './js/ChartScreen';
import ListScreen from './js/CompanyListScreen';
import CompanyDetailScreen from './js/CompanyDetailScreen';
import SideMenuScreen from './js/SideMenuScreen';


const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  CompanyDetail: { screen: CompanyDetailScreen },
  Chart: { screen: ChartScreen },
  SideMenuGroup : {screen : SideMenuScreen},
  ListGroup : {screen : ListScreen},
});

AppRegistry.registerComponent('stockchecker', () => SimpleApp);


