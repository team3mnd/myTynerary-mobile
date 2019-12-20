import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import { AsyncStorage } from 'react-native';
import { Header } from 'react-native-elements';
const jwtDecode = require('jwt-decode');
 
class NavBar extends React.PureComponent {
  state = {
    userName: '',
    token: '',
    imageUrl: '',
    success : ''
  };
 
  componentDidMount() {
    let tokenDecoded = ''
    AsyncStorage.getItem("token").then((value) => {
      console.log("----------------value token:", value)
      if (value !== null){
        tokenDecoded = jwtDecode(value);
      }
    });
    AsyncStorage.getItem("success").then((value) => {
      console.log("----------------value success:", value)
      if (value !== null) {
        let imageUrl = tokenDecoded.picture;
        let userName = tokenDecoded.username;
        this.setState({ imageUrl });
        this.setState({ success: value });
        this.setState({ userName });
      }
    }).catch((error) => {
      console.log(error);
    });
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
       <Header containerStyle={{
        backgroundColor: '#003499'
      }}>
         <View>
        {
          this.state.success === 'true'
            ?
            // <Image style={{ width: 60, height: 60, borderRadius: 50, padding: 5 }}
            // source={this.state.imageUrl} onPress={this.showMenu}/>
                
            <Menu ref={this.setMenuRef}  button={<FontAwesomeIcon onPress={this.showMenu} icon={faUserCircle} size={32} color={'black'} />}>
              <MenuItem>Hola {this.state.userName}!</MenuItem>
              <MenuItem onPress={() => { this.props.navigation.navigate('Logout') }}>Log Out</MenuItem>
            </Menu> :
 
            <Menu 
              ref={this.setMenuRef}
              button={<FontAwesomeIcon onPress={this.showMenu} icon={faUserCircle} size={32} color={'white'} />}>
              <MenuItem  onPress={() => { this.props.navigation.navigate('login') }}>Login</MenuItem>
              <MenuItem  onPress={() => { this.props.navigation.navigate('signup') }}>Create Account</MenuItem>
            </Menu> }
      </View>
      </Header>
    );
  }
}
 
const mapStateToProps = (state) => {
  return ({
    successStore: state.sesionReducer.success
  })
};
 
export default connect(mapStateToProps)(NavBar);