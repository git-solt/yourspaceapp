import React from 'react'

const LoadPage = () => (
  <div className="post post--loading container container--full container__content-center-x2 column">
    <h3>Just a moment...</h3>
    <img className="loader__gif" height="500px" width="500px" src="/assets/circle.gif"/>
  </div>
)

export default LoadPage