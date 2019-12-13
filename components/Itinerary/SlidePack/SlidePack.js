import React from 'react';
import './SlidePack.css'

export default class SlidePack extends React.Component {
  fourImages() {
    return this.props.setObj.map((data, index) => {
      /* console.log(data) */
      return <div key={index} style={{ margin: "1%" }} className='container-card'>
        <img style={{ width: "30vw", height: "30vw", objectFit: "cover" }} src={data.picture} alt={index} />
        <div className='texto-centrado'>{data.title}</div>
      </div>
    })
  }


  render() {
    return <div id='capaimg' className="container">
      <div className="d-flex">
        {this.fourImages()}
      </div>
    </div>
  }
}