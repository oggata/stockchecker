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
import { Button, SideMenu, Menu, List, ListItem, ButtonGroup, SearchBar, CheckBox } from 'react-native-elements';


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
        <Button onPress={() => navigate('ListGroup', { user: 'test' })} title="ListGroup" />
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

class ListScreen extends React.Component {
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
        <List>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                icon={{name: item.icon}}
              />
            ))
          }
        </List>
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
  ButtonGroup: { screen: ButtonGroupScreen },
  SearchbarGroup : {screen : SearchbarScreen},
  CheckBoxGroup : {screen : CheckboxScreen},
  SideMenuGroup : {screen : SideMenuScreen},
  ListGroup : {screen : ListScreen},
});

//AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
AppRegistry.registerComponent('stockchecker', () => SimpleApp);


