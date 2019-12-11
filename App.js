import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

//import { Provider } from 'react-redux';
//import store from './components/store/store';

import Home from './components/Home/home.js';
import Cities from './components/cities/cities.js';

export default class App extends React.Component {
	render() {
	  return(
		   <AppContainer />
		   );
	}
  }
  const TabNavigator = createBottomTabNavigator({
	Home: Home,
	Cities: Cities,
  });

const AppContainer = createAppContainer(TabNavigator);