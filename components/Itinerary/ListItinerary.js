// Funcionales
import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
// Conexion
import { connect } from "react-redux";
import { getAllItineraries } from '../store/actions/itineraryActions';
import { NavigationActions } from 'react-navigation';
// Components
import Itinerary from './Itinerary.js';
import ButtonLogin from '../nav/buttonLogin.js';

class ListItinerary extends Component {

  constructor() {
    super();
    this.redirect = this.redirect.bind(this)
  }
  state = {
    listItinerary: []
  }

  componentDidMount() {
    let city = this.props.navigation.getParam('city');
    let country = this.props.navigation.getParam('country');
    this.props.setItinerary(`https://mytinerary-back.herokuapp.com/cities/${country}/${city}`)
  }

  componentDidUpdate(prevProps) {
    if (this.props.itineraryCity !== prevProps.itineraryCity) {
      this.setState({
        listItinerary: this.props.itineraryCity
      })
    }

  orderItinerary() {
    return this.state.listItinerary.map((i) => {
      return <Itinerary key={i._id} itinerary={i} />
    })
  }

  redirect() {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'init',
        action: NavigationActions.navigate({
          routeName: 'Cities',
        })
      })
    )
  }

  render() {
    return (
      <ScrollView>
        <ButtonLogin navigation={this.props.navigation} />
        {this.props.loading ? (<View><Text style={{textAlign: 'center'}}>Nothing</Text></View>)
          :<>
            <View style={{width: '100%', alignItems: 'center'}}>
              {this.orderItinerary()}
            </View>
            <View>
              <Button type='clear' title='Choose another city' onPress={this.redirect} />
            </View>
          </>}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    itineraryCity: state.itineraryReducer.itineraryCity,
    loading: state.itineraryReducer.isFetching
  }
};

const mapDispatchToProps = (dispatch) => ({
  setItinerary: (pathname) => {
    dispatch(getAllItineraries(pathname))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItinerary);