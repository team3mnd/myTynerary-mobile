import React from 'react';
import { View, StyleSheet } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import { Image } from 'react-native'
import {AsyncStorage} from 'react-native';
const jwtDecode = require('jwt-decode');

class NavBar extends React.PureComponent {
  state = {
    userName: '',
    token: '',
    imageUrl: ''
  };

  componentDidMount() {
    const token = AsyncStorage.getItem('token');
    //let tokenDecoded = jwtDecode(token)
    console.log(token)
    if (AsyncStorage.getItem('success') === 'true') {
      console.log('entroo')
      const userName = tokenDecoded.username;
      const imageUrl = tokenDecoded.picture
      this.setState({imageUrl});
      this.setState({userName})
    }
  }
  _menu = null;

  setMenuRef = ref => { this._menu = ref };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View style={style.container}>
        {
          AsyncStorage.getItem('success') === 'true'
            ?
            <Menu ref={this.setMenuRef} button={<View style={style.containerImageProfile}>
              <Image style={{ width: "60px", height: "60px", borderRadius: "50%", padding: '5%' }}
                source={this.state.imageUrl} /></View>}>
              <MenuItem>{this.state.userName}</MenuItem>
              <MenuItem onPress={() => { this.hideMenu(); this.props.navigation.navigate('Logout') }}>Log Out</MenuItem>
            </Menu> :

            <Menu
              ref={this.setMenuRef}
              button={<FontAwesomeIcon onPress={this.showMenu} icon={faUserCircle} size={32} color={'black'} />}
            >
              <MenuItem onPress={() => { this.hideMenu(); this.props.navigation.navigate('login') }}>Login</MenuItem>
              <MenuItem onPress={() => { this.hideMenu(); this.props.navigation.navigate('signup') }}>Create Account</MenuItem>
              <MenuItem onPress={() => { this.hideMenu(); this.props.navigation.navigate('Logout') }}>Log Out</MenuItem>
            </Menu>
        }
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop:9,
    paddingLeft:9
  },
  containerImageProfile: {
    position: 'relative',
    textAlign: 'center'
  }

})

const mapStateToProps = (state) => {
  return ({
    successStore: state.sesionReducer.success
  })
};

export default connect(mapStateToProps)(NavBar);