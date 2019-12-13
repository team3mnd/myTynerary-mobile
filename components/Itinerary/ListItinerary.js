// Funcionales
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// Conexion
import { connect } from "react-redux";
import { getAllItineraries } from '../store/actions/itineraryActions';
// Components
/* import Itinerary from './Itinerary';
import Loading from '../Loading';
import NavBar from '../Nav/nav'; */

class ListItinerary extends Component {
  state = {
    listItinerary: []
  }

  /*  componentDidMount() {
     this.props.setItinerary(this.props.match.url)
   } */

  /* componentDidUpdate(prevProps) {
    if (this.props.itineraryCity !== prevProps.itineraryCity) {
      this.setState({
        listItinerary: this.props.itineraryCity
      })
    }
  } */

  render() {
    /* const { listItinerary } = this.state */
    return (
      <View>
        
        <Text>Itinerary</Text>

        {/* {this.props.loading
          ? (<View><Text>nothing</Text></View>)
          :
          <>
            <View>

              <Text>Itinerary</Text>

            </View>
            <View>
              <Text>Choose another city</Text>
            </View>
          </>
        } */}

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

// export default connect(mapStateToProps, mapDispatchToProps)(ListItinerary);

export default ListItinerary;