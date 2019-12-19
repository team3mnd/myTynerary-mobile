import React, { Component } from "react";
import { postFavourites, getAllFavourites } from '../store/actions/favouriteActions';
import { connect } from "react-redux";
import Card from "./card.js";
import { CheckBox } from 'react-native-elements';
import { View, Text, Image, Button, StyleSheet, AsyncStorage } from "react-native";

// necesario para corazon
const jwtDecode = require('jwt-decode');
// fin corazon

class Itinerary extends Component {
  state = {
    itinerary: [],
    hashtags: [],
    expand: false,
    userId: "",
    favourite: false
  };
  async componentDidMount() {
    // necesario para corazon
    const token = ''
    AsyncStorage.getItem("token")
      .then((value) => {
        token = jwtDecode(value);
      })
      .catch((err) => { console.log(err) });

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
  }

  render() {
    const { expand, hashtags, userId } = this.state;
    const { itinerary } = this.props;

    return (
      <View key={itinerary._id} style={style.card} >
        <View style={style.itineraryTittle}>
          <View>
            <Image style={style.img} source={{ uri: `https://mytinerary-back.herokuapp.com${itinerary.pictureId}` }} />
            <Text style={{ fontSize: 18, margin: 5, textAlign: 'center' }}>{itinerary.author}</Text>
          </View>
          <View style={style.itineraryContent}>
            <View>
              <Text style={style.nameItinerary}>{itinerary.title}</Text>
            </View>
            <View>
              <Text>Likes: {itinerary.rating}</Text>
              <Text>Duration: {itinerary.duration}</Text>
              <Text>Price: {itinerary.price}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <CheckBox
              checkedIcon='heart'
              size={16}
              uncheckedIcon='heart'
              checkedColor='red'
              checked={this.state.favourite}
              onPress={() => this.setState({favourite: !this.state.favourite})}
            />
          </View>
        </View>
        <View>
          <View>
            {expand && <Card Activities={itinerary.activities} comments={itinerary.comments} _id={itinerary._id} />}
            <Button onPress={() => this.setState({ expand: !this.state.expand })} title='View Activities' />
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  img: {
    width: 110,
    height: 110,
    margin: 5,
    borderRadius: 10
  },
  itineraryTittle: {
    flexDirection: 'row',

  },
  itineraryContent: {
    margin: 10,
    width: '50%'
  },
  card: {
    width: '95%',
    borderColor: 'gray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    shadowRadius: 5
  },
  nameItinerary: {
    fontSize: 20
  }
})

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
