import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer , createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from './components/login/login.js';
import createAcount from './components/signup/signup.js';
import ListItinerary from './components/Itinerary/ListItinerary';

import { Provider } from 'react-redux';
import store from './components/store/store';

import Home from './components/Home/home.js';
import Cities from './components/cities/cities.js';

export default class App extends React.Component {
	render() {
	  return(
			<Provider store={store}>
		   		<AppContainer />
		   	</Provider>
		   );
	}
  }
  const TabNavigator = createBottomTabNavigator({
	Home: Home,
	Cities: Cities
  });

const AppContainer = createAppContainer(createSwitchNavigator({
	init : TabNavigator,
	login : Login,
	signup: createAcount,
	listItinerary: ListItinerary
}));