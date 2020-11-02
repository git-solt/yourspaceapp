import React from 'react'

const Select = () => {
  return (
    <div className="select__container">
      <h3>Layout</h3>
      <div className="select">
        <select className="" name="" id="">
          <option selected disabled >Choose a layout</option>

          <option className="hide" value="COVER">Crop</option>
          <option className="hide" value="FILL">Fill</option>
          <option className="hide" value="CONTAIN">Contain</option>
          <option className="hide" value="SCALEDOWN">Scaledown</option>
        </select>
      </div>
    </div>
  )
}


export default Select