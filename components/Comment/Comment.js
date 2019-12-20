import React, { Component } from 'react';
import { AsyncStorage, View, Text, TextInput, Image, Button, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { sendComment } from '../store/actions/commentActions';
const jwtDecode = require('jwt-decode');

class Comment extends Component {
  constructor() {
    super();
    this.getComment = this.getComment.bind(this);
    this.state = {
      userName: '',
      token: '',
      imageUrl: '',
      message: '',
      date: '',
      success: false
    }
  }
   componentDidMount() {
    let token = '';
    AsyncStorage.getItem("token")
      .then((value) => {
        token = jwtDecode(value);
      })
      .catch((err)=>{console.log(err)});
    this.setState({ token });
    AsyncStorage.getItem("success").then((value) => {
      this.setState({success : value})
      if (this.state.success === "true") {
        let imageUrl = token.picture;
        let userName = token.username;
        this.setState({ imageUrl });
        this.setState({ userName });
      }
    }).catch((error) => {
      console.log(error);
    }); 
  }

  componentDidUpdate(prevProps){
    if (this.props.comments !== prevProps.comments){
      console.log(this.props.comments);
    }
  }

  setValueMessage(string) {
    this.setState({ message: string })
  }

  getComment() {
    let comment = {
      comment: this.state.message,
      date: this.setState.date,
      photo: this.state.imageUrl,
      user: this.state.userName,
      _id: this.props._id
    }

    this.setState({
      message : ''
    })
    this.props.updateComment(comment);
    this.props.commentSend(comment);
    this.setState({ message: '' });
  }

  render() {
    console.log(this.state.success)
    return (
      <View>
        {
          this.state.success=== 'true'
            ?
            <View>
              <View>
                <Image
                  source={{ uri : this.state.imageUrl}}
                  style={{ width: 50, height: 50, borderRadius: 50, padding: 2 }}
                />
              </View>
              <View>
                <TextInput placeholder="Your comment..." value={this.state.message}
                  onChangeText={e => this.setValueMessage(e)} />
                <View style={{ paddingTop: '1%', paddingBottom: '3%' }}>
                  <Button color='#003499'
                    title='send'
                    onPress={this.getComment}>
                  </Button>
                </View>
              </View>
            </View>
            :
            <View>
              <Text>You have to be logged in to comment</Text>
            </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comment: state.commentReducer.comment,
    sending: state.commentReducer.isSending
  };
};

const mapDispatchToProps = (dispatch) => ({
  commentSend: (comment) => {
    dispatch(sendComment(comment))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
