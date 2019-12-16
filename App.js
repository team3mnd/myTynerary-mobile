import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from './components/login/login.js';
import createAcount from './components/signup/signup.js';
import ListItinerary from './components/Itinerary/ListItinerary';

import { Provider } from 'react-redux';
import store from './components/store/store';

import Home from './components/Home/home.js';
import Cities from './components/cities/cities.js';
import Logout from './components/logout/logout.js'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCity } from '@fortawesome/free-solid-svg-icons';

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppContainer />
			</Provider>
		);
	}
}

const TabNavigatorConfig = {
	activeTintColor: '#e91e63',
}
const TabNavigator = createBottomTabNavigator({
	Home: {
		screen: Home,
		navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (
				<FontAwesomeIcon icon={faHome} size={28} color={'white'} />
			)
		})
	},
	Cities: {
		screen: Cities,
		navigationOptions: () => ({
			tabBarIcon: ({ tintColor }) => (
				<FontAwesomeIcon icon={faCity} size={28} color={'white'} />
			)
		})
	}
}, {
	tabBarOptions: {
		//showLabel: false,
		labelStyle: {
			fontSize: 16,
		},// hide labels
		activeTintColor: '#F8F8F8', // active icon color
		inactiveTintColor: '#586589',  // inactive icon color
		style: {
			backgroundColor: '#171F33' // TabBar background
		}
	}
})

const AppContainer = createAppContainer(createSwitchNavigator({
	init : TabNavigator,
	login : Login,
	signup: createAcount,
	Logout: Logout,
	listItinerary: ListItinerary
}));