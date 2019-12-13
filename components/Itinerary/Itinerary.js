import React, { Component } from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import "./Itinerary.css";
import { connect } from "react-redux";
import { postFavourites, getAllFavourites } from '../../store/actions/favouriteActions';

import Card from "./card.js";

// necesario para corazon
const jwt = require("jsonwebtoken");
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
    const token = localStorage.getItem('token');
    const tokenDecoded = jwt.decode(token);
    // console.log(tokenDecoded)
    this.setState({
      itinerary: this.props.itinerary,
      hashtags: this.props.itinerary.hashtags
    });
    if (tokenDecoded) {
      const userId = tokenDecoded.id
      await this.setState({ userId })
      /* this.setState({
        itinerary: this.props.itinerary,
        hashtags: this.props.itinerary.hashtags
      }); */
      this.props.getFavourites(this.state.userId);
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.favourites !== prevProps.favourites) {
      /* this.setState({
        listItinerary: this.props.favourites
      }) */

      if (this.props.favourites.length) {
        // console.log("this.props.favourites", this.props.favourites);
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
    const { itinerary, expand, hashtags, userId } = this.state;
    return (
      <div className="containerItinerary" key={itinerary._id}>
        <div className="wrapperItinerary">
          <div className="profilePicture">
            <img src={itinerary.pictureId} alt="imageProfile" id="imageProfile" />
            <p className='text-break'>{itinerary.author}</p>
          </div>
          <div className="infoItinerary">
            <div className='d-flex flex-row'>
              <div className="col-9 p-0 pt-3 pl-3">
                <p className='font-weight-bold'>{itinerary.title}</p>
              </div>

              <div className="col-3">
                {userId ?
                  <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH"
                      onClick={() => this.onClickFunc()}
                      checked={this.state.favourite} />} />
                  :
                  <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH"
                      onClick={() => console.log('clicked')}
                      disabled
                    />} />
                }
              </div>
            </div>

            <div className="inlineInfo">
              <span>Likes: {itinerary.rating}</span>
              <span>Duration: {itinerary.duration}</span>
              <span>Price: {itinerary.price}</span>
            </div>

            <div className="w-100 d-flex flex-row flex-wrap">
              {hashtags.map((hash, i) => (
                <span key={i} className="badge badge-secondary m-1">{hash}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="containerActivities">
          <div className="d-flex justify-content-center pb-2">
            <button className="btn btn-outline-info" onClick={() => this.setState({ expand: !this.state.expand })}>
              View Activities
          </button>
          </div>
          <div className="containerActivitiesExpand">
            {expand && <Card className="viewsImg" Activities={itinerary.activities} comments={itinerary.comments} _id={itinerary._id} />}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    favourites: state.favouriteReducer.favourites
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
