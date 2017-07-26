import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ScrollView } from 'react-native';
import { Button, SideMenu, Menu, List, ListItem, ButtonGroup, SearchBar, CheckBox } from 'react-native-elements';
import Table from 'react-native-simple-table';
import Chart from 'react-native-chart';
import RNChart from 'react-native-chart';



const data = [
    ['7/1', 1000]
];

var api = {
  getPrices(companyCode,interval,range){
    var url = 'https://www.google.com/finance/getprices?q=' + companyCode + '&x=NASDAQ&i=' + interval + '&p=' + range + '&f=d,c,v,o,h,l&df=cpct&auto=1&ts=1489550582260&ei=4rrIWJHoIYya0QS1i4IQ';
    return fetch(url).then((res) => res.text()); 
  }
};

export default class ChartScreen extends React.Component {
  static navigationOptions = {
    title: 'ChartScreen',
  };
  constructor(props) {
    super(props);
    console.log("----------------------->");
    //console.log(this.props.navigation.state.params.code);

    this.state = { loading: false, prices: [], points:data, company:this.props.navigation.state.params};
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
     //var companyCode = "AAPL";
    //if(this.state.company.cod){
      var companyCode = this.state.company.code;
    //}
     console.log("----------------------->"); 
     if(!this.state.company.code){
      companyCode = "AAPL";
     }

     //1M:86400sec=1日 3M:86400 * 3 = 259200 : 3日 1Y:86400 * 12
     api.getPrices(companyCode,259200,'3M').then((res) => {

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
        }
      }
      this.setState({
        prices : this.prices,
        points : this.points
      })
     });
  }

  toggle() {
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
    const buttons = ['1year', '3month', '1month']
    let dataSource = this.state.prices;

    return (

        <View style={{height: 300,flex: 1}}>

            <ButtonGroup
              onPress={() => {
                this.setState(
                  {selectedTab: this.updateIndex}
                );
              }}
              buttons={buttons} />

            <View style={styles.chartView}>
              <Chart style={styles.chart}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chartView:{
    height: 300,
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'white'
  },
  chart:{
    width: 400,
    height: 300,
    top: 1,
    left: 1, 
    bottom: 1,
    right: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});
