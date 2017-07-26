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

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'ListsScreen',
  };

  constructor(props) {
    super(props);
    this.state = { loading: false, movies: [] };
  }

  componentWillMount(){
     api.getCompanies().then((res) => {
      this.setState({
        movies: res.companies
       })
     });
  }

  renderMovies() {
    return this.state.movies.map(movie =>
      <MovieDetail key={movie.title} record={movie} />
    );
  }

  toggle() {

  }

  render() {
    const { navigate } = this.props.navigation;
    const menu = <Menu navigator={navigator}/>;
    return (
      <View>
        <SearchBar
          lightTheme
          onChangeText='aaa'
          placeholder='Type Here...' />

        <ScrollView>
        <List>
          {
            this.state.movies.map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                subtitle={item.market}
                icon={{name: item.icon}}
                onPress={() => this.props.navigation.navigate('Chart',item)}
              />
            ))
          }
        </List>
        </ScrollView>
      </View>
    );
  }
}
