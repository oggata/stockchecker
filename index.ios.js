import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
//import { SideMenu,Menu } from 'react-native-side-menu';
import { Menu } from 'react-native-side-menu';
//const SideMenu = require('react-native-side-menu');
import { Button, SideMenu, List, ListItem, ButtonGroup, SearchBar, CheckBox } from 'react-native-elements';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
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
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button onPress={() => navigate('Chat', { user: 'Lucy' })} title="Chat" />
        <Button onPress={() => navigate('ButtonGroup', { user: 'test' })} title="ButtonGroup" />
        <Button onPress={() => navigate('SearchbarGroup', { user: 'test' })} title="SearchbarGroup" />
        <Button onPress={() => navigate('CheckBoxGroup', { user: 'test' })} title="CheckBoxGroup" />
        <Button onPress={() => navigate('SideMenuGroup', { user: 'test' })} title="SideMenuGroup" />
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
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
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}


const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]

class ListsScreen extends React.Component {
  static navigationOptions = {
    title: 'ListsScreen',
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
        <Text>ListsScreen</Text>
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
    this.state = { toggled: false };
  }
  toggle() {
      console.log(this.state);
      // let state = this.state.loading;
      console.log("Clicked!")
      // this.setState({ loading: !state })
  }
  toggleSideMenu () {
    this.setState({
      toggled: !this.state.toggled
    })
  }
  render() {
    const menu = <Menu navigator={navigator}/>;
    return (
      <View>
        <Text>SideMenuScreen</Text>
      </View>
    );
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
  ButtonGroup: { screen: ButtonGroupScreen },
  SearchbarGroup : {screen : SearchbarScreen},
  CheckBoxGroup : {screen : CheckboxScreen},
  SideMenuGroup : {screen : SideMenuScreen}
});

//AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
AppRegistry.registerComponent('stockchecker', () => SimpleApp);


