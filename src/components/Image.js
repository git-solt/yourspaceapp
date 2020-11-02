import React, { useState, useReducer, useEffect } from 'react'
import WorkingSpinner from './WorkingSpinner'
import reducer from '../hooks/reducers/layoutReducer'
import updateLayout from '../utils/updateLayout'


const Image = ({ pics, post, id, src, isAdmin, startRemovePicHandler, token }) => {

  const [working, setWorking] = useState(false)
  const [initLayout, setInitLayout] = useState('')
  const [selectedLayout, selectLayout] = useState('')
  const [layOut, dispatchLayout] = useReducer(reducer, 'img-fit-fill')
  const [button, closeButton] = useState(false)

  useEffect(() => {
    const { layout } = pics.find((cur) => cur.image === id)
    console.log(layout)
    if (layout) {

      dispatchLayout({ type: layout.toUpperCase() })
    }
    setInitLayout(layout)
    //Probably trying to updte something that does not exist, cause you didint update the store.
  },[])

  return (
    <div className="container__content-center relative">
      {isAdmin &&
        <div>
          <a className="link-button absolute" href="#" onClick={(e) => {
            e.preventDefault()
            setWorking(true)
            startRemovePicHandler(id)
          }}>
            {!working ? 'X' : <WorkingSpinner />}
          </a>
        </div>}
      {id === 'loader' ?
        <img src='/assets/smoke.gif' alt="pictureupload" height="350px" width="300px" />
        :
        <img src={src} alt="pictureupload" height="350px" width="300px" className={layOut} />}
      {
        isAdmin &&
        id !== 'loader' &&
        <div className="container__content-center-x2 absolute absolute--layout column ">
          <select defaultValue="pick" className="select--style select--style--bgchange" onChange={(e) => {
            if (button) {
              closeButton(false)
            }
            switch (e.target.value) {
              case 'COVER': {

                selectLayout(e.target.value)
                return dispatchLayout({ type: e.target.value })
              }

              case 'FILL': {
                selectLayout(e.target.value)

                return dispatchLayout({ type: e.target.value })

              }

              case 'SCALEDOWN': {
                selectLayout(e.target.value)

                return dispatchLayout({ type: e.target.value })

              }

              case 'CONTAIN': {
                selectLayout(e.target.value)

                return dispatchLayout({ type: e.target.value })
              }
            }
          }}>

            <option hidden disabled value="pick">Pick layout</option>
            <option value="COVER">Crop</option>
            <option value="FILL">Fill</option>
            <option value="CONTAIN">Contain</option>
            <option value="SCALEDOWN">Scaledown</option>

          </select>

          {
            initLayout.toLowerCase() !== selectedLayout.toLowerCase() &&
            selectedLayout &&
            !button &&
            <button className="button button--margin button__hide--inherrit" onClick={() => {
              const lo = selectedLayout.toLocaleLowerCase()
              updateLayout(lo, post, id, token)
                .then(data => closeButton(true))
                .catch(e => console.log(e))
            }}>Save</button>}

        </div>}
    </div>
  )
}


export default Image