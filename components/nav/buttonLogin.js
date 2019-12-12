import React from 'react';
import { View, StyleSheet } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
 
class NavBar extends React.PureComponent {
    _menu = null;
  
    setMenuRef = ref => {this._menu = ref};
  
    hideMenu = () => {
      this._menu.hide();
    };
  
    showMenu = () => {
      this._menu.show();
    };
  
    render() {
      return (
        <View style={style.container}>
          <Menu
          ref={this.setMenuRef}
          button={<FontAwesomeIcon onPress={this.showMenu} icon={ faUserCircle } size={32} color={'black'} />}
        > 
            <MenuItem onPress={()=>{this.hideMenu();this.props.navigation.navigate('login')}}>Login</MenuItem>
            <MenuItem onPress={()=>{this.hideMenu();this.props.navigation.navigate('signup')}}>Create Account</MenuItem>
          </Menu>
        </View>
      );
    }
  }
  const style = StyleSheet.create({
      container : {
          alignItems: 'flex-start',
          width: '50%',
          margin: 9
        }

  })
  
  export default NavBar;