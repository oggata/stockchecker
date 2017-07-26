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

var api = {
  getCompanies(){
    var url = 'https://oggata.github.io/stockchecker/sample/api-001.json';
    return fetch(url).then((res) => res.json());
  },

  getPrices(){
    var url = 'https://www.google.com/finance/getprices?q=AAPL&x=NASDAQ&i=86400&p=1M&f=d,c,v,o,h,l&df=cpct&auto=1&ts=1489550582260&ei=4rrIWJHoIYya0QS1i4IQ';
    return fetch(url).then((res) => res.text()); 
  }
};

const columns = [
  {
    title: '日付',
    dataIndex: 'strdate',
    width: 70
  },
  {
    title: '終値',
    dataIndex: 'owarine',
    width: 50
  },
  {
    title: '高値',
    dataIndex: 'takane',
    width: 50
  },
  {
    title: '安値',
    dataIndex: 'yasune',
    width: 50
  },
  {
    title: '始値',
    dataIndex: 'hajimene',
    width: 50
  },
  {
    title: '出来高',
    dataIndex: 'dekidaka',
    width: 100
  },
];

export default class CompanyDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  constructor(props) {
    super(props);
    this.state = { loading: false, prices: []};
  }

  unixToDate(unixtime){
    var ux = unixtime;
    var d = new Date( ux * 1000 );
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    return month + "/" + day;
  }

  componentWillMount(){
     api.getPrices().then((res) => {

      //改行でsplitしてlineに配列として入れる
      var lines = res.split(/\r\n|\r|\n/);
      //８行目以降は価格部になるので、配列に入れておく
      this.prices = []; 
      /*
        a で始まる時刻: aを取った文字列がUNIX時刻
        a で始まらない時刻:
        a で始まる時刻 + INTERVAL × この列の数値
      */
      this.firstUnixTime = 0;
      for(i = 7; i < lines.length; i++) {
        var columns = lines[i].split(',');
        if(columns[0].startsWith('a')){
          var _unixtime = columns[0].slice(1);
          this.firstUnixTime = _unixtime;
          //var _txt = _unixtime + "," + this.unixToDate(_unixtime) + "," + columns[1] + "," + columns[2] + "," + columns[3];
          //var _txt = "{name:'AAAAA'}";
          var _txt = new Object();
          _txt.name = "hello";
          _txt.strdate = this.unixToDate(_unixtime);
          _txt.owarine = columns[1];
          _txt.takane = columns[2];
          _txt.yasune = columns[3];
          _txt.hajimene = columns[4];
          _txt.dekidaka = columns[5];

          this.prices.push(_txt);
        }else{
          var _unixtime = Number(this.firstUnixTime) + (86400 * Number(columns[0]));
          //var _txt = _unixtime + "," + this.unixToDate(_unixtime) + "," + columns[1] + "," + columns[2] + "," + columns[3];
          //var _txt = "{name:'AAAAA'}";
          var _txt = new Object();
          _txt.name = "hello";
          _txt.strdate = this.unixToDate(_unixtime);
          _txt.owarine = columns[1];
          _txt.takane = columns[2];
          _txt.yasune = columns[3];
          _txt.hajimene = columns[4];
          _txt.dekidaka = columns[5];
          
          this.prices.push(_txt);
        }
      }
      //console.log(this.prices[0].name)
      this.setState({
        prices : this.prices
      })
     });
  }

  toggle() {
      console.log(this.state);
      // let state = this.state.loading;
      console.log("Clicked!")
      // this.setState({ loading: !state })
  }

  render() {
    const menu = <Menu navigator={navigator}/>;
    //let dataSource = DataFactory.generate().data;
    let dataSource = this.state.prices;

    return (
      <View>
        <Text>Apple Inc</Text>
        <Text>Apple Inc</Text>
        <Text>Apple Inc</Text>
        <Text>Apple Inc</Text>

        <Text>react-native-simple-table</Text>
        <Table height={400} columnWidth={60} columns={columns} dataSource={dataSource} />
      </View>
    );
  }
}

