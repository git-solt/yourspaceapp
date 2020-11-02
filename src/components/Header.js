import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import startLogOut from '../utils/startLogout'
import setCurrentUser from '../utils/setCurrentUser'
import { setAuth, clearAuth } from '../redux/generators/auth'
import { addPost, clearPosts } from '../redux/generators/posts'
import fetchPosts from '../utils/fetchPosts'
import LoginDropDown from './LoginDropDown'
import { RegModal } from './Register'
import { addTitle, addContent } from '../redux/generators/filter'
import Filter from './Filter'

const Header = (props) => {
  const [form, setForm] = useState(false)
  const [modal, setModal] = useState(false)

  useEffect(() => {


    setCurrentUser(props.dispatch, setAuth)


  }, [])


  useEffect(() => {
    fetchPosts({limit:5})
      .then((posts) => {
        posts.forEach(({ title, content, published, _id: id, pics, owner, createdAt }) => {
          props.dispatch(addPost({ title, content, published, id, pics, owner, createdAt }))

        })

      })


    return () => props.dispatch(clearPosts())

  }, [])

  // useEffect(() => {
  //   console.log('2', props)
  // }, [props])
  return (

    <header className="header">
      <div className="container relative">
        <h1 className="header__title">Get it to day</h1>
      </div>
      {!props.user.token ?
        <div className="container__auth-nav" >
          <a className="header__auth" href="#" onClick={() => {
            setForm(!form)
            setModal(false)
          }}>Sign in</a>
          <a className="header__auth" onClick={() => {
            setModal(!modal)
            setForm(false)
          }} href="#">Register</a>
        </div>
        :

        <a
          className="header__auth"
          href="#"
          onClick={(e) => {
            if (props.user.token) {
              startLogOut(props.user.token)
                .then((data) => {
                  localStorage.removeItem('jwt')
                  localStorage.removeItem('currentUser')
                  props.dispatch(clearAuth())
                })
                .catch(e => console.log(e))
            }
          }}
        >
          Sign Out
        </a>

      }

      {modal && <RegModal setForm={setForm} setModal={setModal} />}
      {form && !props.user.token &&
        <div>
          <div className="arrow-up" onClick={() => {
            setForm(!form)
          }}></div>
          <LoginDropDown history={props.history} />
        </div>}
      {props.user.user.isAdmin &&
        <div className="container container__flex header__admin-menu">
          <Link className="header__links" to="/create">Create</Link>
          <Link className="header__links" to="/drafts" >Drafts</Link>
        </div>}
        <Filter />
    </header>
  )
}

const MapStateToProps = (state) => ({
  posts: state.posts,
  user: state.authentication,
  filter: state.filter
})


export default connect(MapStateToProps)(Header)