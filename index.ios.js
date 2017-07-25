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
 
const data = [
    ['7/1', 1000],
    ['7/2', 1000],
    ['7/3', 1000],
    ['7/4', 1000],
    ['7/4', 1000],
    ['7/4', 1000],
    ['7/4', 1000],
    ['7/4', 1000],
];

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super(props);
    console.log("HomeScreen-------->");
    this.state = { loading: false };
  }
  toggle() {
      console.log(this.state);
      // let state = this.state.loading;
      console.log("Clicked!")
      // this.setState({ loading: !state })
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button onPress={() => navigate('Chat', { user: 'Lucy' })} title="Chat" />
        <Button onPress={() => navigate('Chart', { user: 'test' })} title="Chart" />
        <Button onPress={() => navigate('ButtonGroup', { user: 'test' })} title="ButtonGroup" />
        <Button onPress={() => navigate('SearchbarGroup', { user: 'test' })} title="SearchbarGroup" />
        <Button onPress={() => navigate('CheckBoxGroup', { user: 'test' })} title="CheckBoxGroup" />
        <Button onPress={() => navigate('SideMenuGroup', { user: 'test' })} title="SideMenuGroup" />
        <Button onPress={() => navigate('ListGroup', { user: 'test' })} title="ListGroup" />
      </View>
    );
  }
}



/*
      <View>
        <Text>Hello, Chat App!</Text>
        <Button onPress={() => navigate('Chat', { user: 'Lucy' })} title="Chat" />
        <Button onPress={() => navigate('Chart', { user: 'test' })} title="Chart" />
        <Button onPress={() => navigate('ButtonGroup', { user: 'test' })} title="ButtonGroup" />
        <Button onPress={() => navigate('SearchbarGroup', { user: 'test' })} title="SearchbarGroup" />
        <Button onPress={() => navigate('CheckBoxGroup', { user: 'test' })} title="CheckBoxGroup" />
        <Button onPress={() => navigate('SideMenuGroup', { user: 'test' })} title="SideMenuGroup" />
        <Button onPress={() => navigate('ListGroup', { user: 'test' })} title="ListGroup" />
      </View>
*/

class ChatScreen extends React.Component {
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


class ChartScreen extends React.Component {
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

/*
if(columns[1]){
//if(Number(columns[1]) >= 170){
  console.log(">>>>>>>>>>>>>>>>>>>>>");
  console.log(columns[1]);
//}
}

*/
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

  render() {
    const menu = <Menu navigator={navigator}/>;
    let dataSource = this.state.prices;
    return (
        <View style={{width: 300,height: 300,flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
            <Chart
                style={{width: 300,height: 300,marginBottom: 20}}
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
                yAxisWidth={100}
                xAxisHeight={100}
             />
        </View>
    );
  }
}


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

/*
static navigationOptions = {
    title: 'List',
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
     
      <View>
        <Text>Location 1 List!</Text>
        <Button
          onPress={() => navigate('Home')}
          title="Home"
        />
        <FlatList
          data={this.list}
          renderItem={({item}) =>  

          <ListItem item={item}/>
        }

        />
          
      </View>
      );
  }
}
*/

class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'ListsScreen',
  };

  constructor(props) {
    super(props);
    this.state = { loading: false, movies: [] };
    console.log("ListsScreen-------->");
  }

  componentWillMount(){
     api.getCompanies().then((res) => {
      this.setState({
        movies: res.companies
       })
      //console.log("CALL API==================>");
      //console.log(this.state.movies);
     });
  }

  renderMovies() {
    return this.state.movies.map(movie =>
      <MovieDetail key={movie.title} record={movie} />
    );
  }

  toggle() {
      console.log(this.state);
      // let state = this.state.loading;
      console.log("Clicked!")
      // this.setState({ loading: !state })
  }

  render() {
    const { navigate } = this.props.navigation;
    const menu = <Menu navigator={navigator}/>;
    return (
      <View>
        <ScrollView>
        <List>
          {
            this.state.movies.map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                subtitle={item.market}
                icon={{name: item.icon}}
                onPress={() => navigate('Chat')}
              />
            ))
          }
        </List>
        </ScrollView>
      </View>
    );
  }
}

class SideMenuScreen extends React.Component {
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

class SearchbarScreen extends React.Component {
  static navigationOptions = {
    title: 'SearchbarScreen',
  };
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  toggle() {
      console.log(this.state);
      // let state = this.state.loading;
      console.log("Clicked!")
      // this.setState({ loading: !state })
  }
  render() {
    const menu = <Menu navigator={navigator}/>;
    return (
      <View>

        <SearchBar
          onChangeText='aaa'
          placeholder='Type Here...' />

        <SearchBar
          noIcon
          onChangeText='aaa'
          placeholder='Type Here...' />

        <SearchBar
          round
          onChangeText='aaa'
          placeholder='Type Here...' />

        <SearchBar
          lightTheme
          onChangeText='aaa'
          placeholder='Type Here...' />

      </View>
    );
  }
}

class ButtonGroupScreen extends React.Component {
  static navigationOptions = {
    title: 'ButtonGroupScreen',
  };
  constructor(props) {
    super(props);
    //super()
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  toggle() {
      console.log(this.state);
      // let state = this.state.loading;
      console.log("Clicked!")
      // this.setState({ loading: !state })
  }
  render() {
    const buttons = ['Hello', 'World', 'Buttons']
    const { selectedIndex } = this.state
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons} />
    );
  }
}

class CheckboxScreen extends React.Component {
  static navigationOptions = {
    title: 'CheckboxScreen',
  };
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  toggle() {
      console.log(this.state);
      // let state = this.state.loading;
      console.log("Clicked!")
      // this.setState({ loading: !state })
  }
  render() {
    const menu = <Menu navigator={navigator}/>;
    return (
      <View>
        <CheckBox
          title='Click Here'
          checked={this.state.checked}
        />
        <CheckBox
          center
          title='Click Here'
          checked={this.state.checked}
        />
        <CheckBox
          center
          title='Click Here'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
        />
        <CheckBox
          center
          title='Click Here to Remove This Item'
          iconRight
          iconType='material'
          checkedIcon='clear'
          uncheckedIcon='add'
          checkedColor='red'
          checked={this.state.checked}
        />
      </View>
    );
  }
}


const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  Chart: { screen: ChartScreen },
  ButtonGroup: { screen: ButtonGroupScreen },
  SearchbarGroup : {screen : SearchbarScreen},
  CheckBoxGroup : {screen : CheckboxScreen},
  SideMenuGroup : {screen : SideMenuScreen},
  ListGroup : {screen : ListScreen},
});

//AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
AppRegistry.registerComponent('stockchecker', () => SimpleApp);


