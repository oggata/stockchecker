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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const data = [
    ['7/1', 1000]
];

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


export default class ChartScreen extends React.Component {
  static navigationOptions = {
    title: 'ChartScreen',
  };
  constructor(props) {
    super(props);
    this.state = { loading: false, prices: [], points:data};
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
      this.points = [];
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
          var _pointData = [];
          _pointData.push(_txt.strdate);
          _pointData.push(Number(columns[1]));

if(columns[1]){
          this.points.push(_pointData);
}
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

          var _pointData = [];
          _pointData.push(_txt.strdate);
          _pointData.push(Number(columns[1]));
          if(columns[1]){
            this.points.push(_pointData);
          }


if(columns[1]){
//if(Number(columns[1]) >= 170){
  console.log(">>>>>>>>>>>>>>>>>>>>>");
  console.log(columns[1]);
//}
}


//console.log(">>>>>>>>>>>>>>>>>>>>>");
//console.log(columns[1]);

        }
      }
      //console.log(this.prices[0].name)
      this.setState({
        prices : this.prices,
        points : this.points
      })
     });
  }

  toggle() {
      console.log(this.state);
      // let state = this.state.loading;
      console.log("Clicked!")
      // this.setState({ loading: !state })
  }

  renderLoadingView() {
    return (
      <View>
        <Text>
          Loading temperatures...
        </Text>
      </View>
    );
  }

  render() {
    const menu = <Menu navigator={navigator}/>;
    const buttons = ['Hello', 'World', 'Buttons']
    let dataSource = this.state.prices;

    return (
        <View style={{height: 300,flex: 1}}>
            <ButtonGroup
              onPress={this.updateIndex}
              buttons={buttons} />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
              <Chart style={{top: 1, left: 1, bottom: 1,right: 1,width: 400,height: 300}}
                data={this.state.points}
                verticalGridStep={10}
                type="line"
                showDataPoint={true}
                showAxis={true}
                lineWidth={5}
                gridColor={'#DDD'}
                yAxisWidth={35}
                fillColor={'rgba(87,190,133, 0.5)'}
                color={'rgba(87,190,133, 1)'}

                xLabels={[1,2,3,4,5]}
                yLabels={[1,2,3,4,5]}
                yAxisWidth={100}
                xAxisHeight={100} />
             </View>
            <ButtonGroup
              onPress={this.updateIndex}
              buttons={buttons} />
            <ButtonGroup
              onPress={this.updateIndex}
              buttons={buttons} />
            <ButtonGroup
              onPress={this.updateIndex}
              buttons={buttons} />
        </View>
    );
  }
}
