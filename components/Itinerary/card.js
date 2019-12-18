import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from "react-native";
import Comment from '../Comment/Comment';

export default class Card extends Component {

  getComment(comment) {
    this.props.comments.push(comment)
    this.setState({
      updated: !this.state.updated
    })
  }

  constructor() {
    super();
    this.sendComment = this.sendComment.bind(this);
    this.getComment = this.getComment.bind(this);
    this.state = {
      updated: false
    }
  }

  listComments(comment) {
    return comment.comments.map((comment, i) => {
      return (<View style={style.comment} key={i}>
        <View key={i}>
          <Image
            key={i}
            source={{ uri: comment.photo }}
            style={{ width: 50, height: 50, borderRadius: 50, margin: 5 }} />
        </View>
        <View style={{ margin: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{comment.user}</Text>
          <Text>{comment.comment}</Text>
        </View>
      </View>)
    });

  }

  activities() {
    let { Activities } = this.props;
    return Activities.map(i => {
      console.log(`https://mytinerary-back.herokuapp.com${i.picture}`)
      return <Image key={i.title} style={style.img} source={{uri:`https://mytinerary-back.herokuapp.com${i.picture}`}} /> });
  }

  sendComment(e) {
    console.log(e)
  }
  render() {
    return (
      <View style={{ height: 450 }}>
        <ScrollView horizontal={true} style={{height:'40%'}}>
          {this.activities()}
        </ScrollView>
        <Text style={{ margin: 10 }}>Comments: </Text>
        <ScrollView style={{ height: '55%' }}>
          {this.listComments(this.props)}
          <Comment _id={this.props._id} updateComment={this.getComment} />
        </ScrollView>
      </View>
    )
  }
}

const style = StyleSheet.create({
  img:{
    width:150,
    height:150,
    margin: 5
  },
  comment: {
    flexDirection: 'row',
    margin: 3,
    borderRadius: 10,
    backgroundColor: '#CACACA',
    opacity: 0.9
  }
})