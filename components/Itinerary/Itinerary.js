import React, { Component } from "react";
//import "./Itinerary.css";
import { connect } from "react-redux";
//import { postFavourites, getAllFavourites } from '../../store/actions/favouriteActions';

//import Card from "./card.js";
import { View, Text,Image, Button } from "react-native";

// necesario para corazon
//const jwt = require("jsonwebtoken");
// fin corazon

class Itinerary extends Component {
  state = {
    itinerary: [],
    hashtags: [],
    expand: false,
    userId: "",
    favourite: false
  };

  /*   async componentDidMount() {
      // necesario para corazon
      const token = localStorage.getItem('token');
      const tokenDecoded = jwt.decode(token);
      this.setState({
        itinerary: this.props.itinerary,
        hashtags: this.props.itinerary.hashtags
      });
      if (tokenDecoded) {
        const userId = tokenDecoded.id
        await this.setState({ userId })
        this.props.getFavourites(this.state.userId);
      }
    }
  
    async componentDidUpdate(prevProps) {
      if (this.props.favourites !== prevProps.favourites) {
        if (this.props.favourites.length) {
          let favArray = this.props.favourites
          for (let i = 0; i < favArray.length; i++) {
            if (favArray[i]._id === this.state.itinerary._id) {
              this.setState({
                favourite: true
              })
              break
            }
            else {
              this.setState({
                favourite: false
              })
            }
          }
        }
        else {
          this.setState({
            favourite: false
          })
        }
      }
    }
  
    async onClickFunc() {
      await this.props.addOrDelFavourite(this.state.userId, this.state.itinerary._id)
      await this.props.getFavourites(this.state.userId)
    } */

  render() {
    const { itinerary, expand, hashtags, userId } = this.state;
    return (
      <View  key={itinerary._id}>
        <View >
          <View>
            <Image source={{uri:itinerary.pictureId}} />
            <Text>{itinerary.author}</Text>
          </View>
          <View>
            <View>
              <View >
                <Text>{itinerary.title}</Text>
              </View>

            </View>

            <View>
              <Text>Likes: {itinerary.rating}</Text>
              <Text>Duration: {itinerary.duration}</Text>
              <Text>Price: {itinerary.price}</Text>
            </View>
          </View>
        </View>
        <View >
          <View>
            <Button onPress={() => this.setState({ expand: !this.state.expand })} title='View Activities' />
          </View>
          <View>
          </View>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  return {
    //favourites: state.favouriteReducer.favourites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrDelFavourite: (userId, itineraryId) => {
      dispatch(postFavourites(userId, itineraryId))
    },
    getFavourites: (userId) => {
      dispatch(getAllFavourites(userId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
