import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, ScrollView, ImageBackground, TouchableHighlight } from 'react-native';
import { connect } from "react-redux";
import ButtonLogin from '../nav/buttonLogin.js';
import { getAllCities } from "../store/actions/citiesActions";

class Cities extends Component {
  state = {
    filter: '',
    filteredCities: []
  }

  componentDidMount() {
    this.props.getCities();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cities !== prevProps.cities)
      this.setState({
        filteredCities: this.props.cities
      });
  }

  filterCities = valueInput => {
    let resultFilter = this.props.cities;
    resultFilter = resultFilter.filter(cities => {
      let name = cities.name.toLowerCase();
      return name.startsWith(valueInput);
    });
    this.setState({
      filteredCities: resultFilter
    });
  };

  handleChange = e => {
    this.filterCities(e.toLowerCase());
    this.setState({ filter: e })
  };

  render() {
    let { filteredCities } = this.state
    return (
      <View style={styles.appContainer}>
        <ButtonLogin navigation={this.props.navigation}/> 
        <ScrollView style={{width: '90%'}} showsVerticalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            <Text style={{ color: 'black' }}
            >Filter by City name:</Text>
            <TextInput
              style={{
                width: 200,
                height: 40,
                borderColor: 'black',
                borderWidth: 2,
                borderRadius: 10,
                textAlign: 'center',
                marginVertical: 5,
              }}
              placeholder="Example: Madrid"
              onChangeText={
                (filter) => this.handleChange(filter)
              }
              value={this.state.filter}
            />
          </View>

          {/* <ScrollView contentContainerStyle={styles.svContainer}> */}

          {this.props.loading
            ? (<View><Text style={{textAlign: 'center'}}>Loading...</Text></View>)
            : filteredCities.length === 0
              ? (<View><Text style={{textAlign: 'center'}}>City not found</Text></View>)
              : filteredCities.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              }).map(city => {
                return (
                  <View style={styles.appCities} key={city._id}>
                    <TouchableHighlight
                      onPress={() => { this.props.navigation.navigate('listItinerary', { city : city.name, country : city.country}) }}>
                      <ImageBackground
                        source={{ uri: city.url }}
                        style={{
                          width: 400, height: 200,
                        }}
                      >
                        <View>
                          <Text
                            style={{ fontWeight: 'bold', textShadowColor: 'white', textAlign: 'center', textShadowRadius: 5 }}> {city.name}</Text>
                          <Text style={{ fontWeight: 'bold', textShadowColor: 'white', textAlign: 'center', textShadowRadius: 5 }}> {city.country}</Text>
                        </View>
                      </ImageBackground>
                    </TouchableHighlight>
                  </View>
                );
              })} 
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  filterContainer: {
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 20,
  },
  svContainer: {
    flex: 1,
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  appCities: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: 'blue',
    marginBottom: 20,
  },
})


const mapStateToProps = state => {
  return {
    cities: state.cityReducer.cities,
    loading: state.cityReducer.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCities: () => dispatch(getAllCities())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);