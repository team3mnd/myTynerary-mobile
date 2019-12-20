import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImageLogo from './imageLogo.js'
//import { createBottomTabNavigator } from 'react-navigation';
import Slider from './carousel.js'
import ButtonLogin from '../nav/buttonLogin.js'
import { createAppContainer } from 'react-navigation';

//stack


export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ButtonLogin navigation={this.props.navigation}/>
        <ImageLogo />
        <Slider/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%'
  }
});
