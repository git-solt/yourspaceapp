import React, { useState } from 'react'
import { addTitle, addContent, addTitleContent } from '../redux/generators/filter'
import { connect } from 'react-redux'

const Filter = (props) => {
  const [def, useDef] = useState(true)

  const [title, useTitle] = useState(false)
  const [content, useContent] = useState(false)
  const [both, useBoth] = useState(false)

  const [list, displayList] = useState(false)
  const [selected, select] = useState(undefined)

  return (
    <div className="filter__content-right margint--1 filter__relative">
      <div className="filter__content-center filter__header filter__relative" >
        <label className="filter__by" onClick={(e) => {
          displayList(!list)
        }}>{!list && selected ? selected : 'Filter by'}</label>
        {list &&
          <div className="filter__content-center filter__absolute">

            <label className="filter__option" htmlFor="title">Title</label>
            <input className="filter__content-hide" name="filter" id="title" type="radio" value="title" onChange={
              (e) => {
                useContent(false)
                useBoth(false)
                useTitle(true)
                select('Title')
                displayList(false)

              }
            } />
            <label className="filter__option" htmlFor="content">Content</label>
            <input className="filter__content-hide" name="filter" id="content" type="radio" value="content" onChange={
              (e) => {
                useTitle(false)
                useBoth(false)
                useContent(true)
                select('Content')
                displayList(false)
              }
            } />

            <label className="filter__option" htmlFor="both">Both</label>
            <input className="filter__content-hide" name="both" id="both" type="radio" value="both" onChange={
              (e) => {
                useContent(false)
                useTitle(false)
                useBoth(true)
                select('Both')
                displayList(false)

              }
            } />
          </div>}
      </div>

      <input className="filter__search" type="text" onInput={
        (e) => {
          if (content) {

            props.dispatch(addContent(e.target.value))
          } else if (title){
            props.dispatch(addTitle(e.target.value))

          } else if (both) {
            props.dispatch(addTitleContent(e.target.value))
          }
        }
      } />
    </div>
  )
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.authentication,
  filter: state.filter
})
export default connect(mapStateToProps)(Filter)