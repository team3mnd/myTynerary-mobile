import React, { Component } from 'react';
import SlidePack from './SlidePack/SlidePack';
import './card.css';
import Comment from '../Comment/Comment'
import Image from "react-bootstrap/Image";
import "../Nav/NavbarMain.css";

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
      return <div key={i} className="d-flex flex-row border border-secondary mb-1">
        <div className='d-flex flex-column ml-2 pt-2' key={i}>
          <div className="containerImageProfile">
            <Image
              key={i}
              src={comment.photo}
              style={{ width: "50px", height: "50px", borderRadius: "50%", padding: '3%' }}
              alt="imageProfile"
            />
          </div>

        </div>
        <div className='d-flex flex-column ml-3'>
          <p className='font-weight-bold mt-0'>{comment.user}</p>
          <p className='mt-0'>{comment.comment}</p>
        </div>
      </div>
    });

  }

  activities() {
    let { Activities } = this.props;
    return Activities.map(i => i);
  }


  sendComment(e) {
    console.log(e)
  }
  render() {
    return (
      <div className='d-flex justify-content-center flex-column'>
        <SlidePack className="img" setObj={this.activities()} />
        <h5 style={{ marginTop: "15px" }}>Comments: </h5>
        {this.listComments(this.props)}

        <Comment _id={this.props._id} updateComment={this.getComment} />
      </div>
    )
  }
}