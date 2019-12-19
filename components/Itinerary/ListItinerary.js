// Funcionales
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// Conexion
import { connect } from "react-redux";
import { getAllItineraries } from '../store/actions/itineraryActions';
// Components
import Itinerary from './Itinerary.js';
import ButtonLogin from '../nav/buttonLogin.js';
/*import Loading from '../Loading';
import NavBar from '../Nav/nav'; */

class ListItinerary extends Component {
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
  } 

  render() {
    return (
      <View>
        <ButtonLogin navigation={this.props.navigation}/>
        <Text>Itinerary</Text>

         {this.props.loading
          ? (<View><Text>nothing</Text></View>)
          :
          <>
            <View>

              <Itinerary/>

            </View>
            <View>
              <Text>Choose another city</Text>
            </View>
          </>
        }

      </View>
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
