import React, { useEffect } from 'react'
import UserForm from './UserForm'
import { withRouter } from 'react-router-dom'

const Register = ({ history }) => (
  <div>
    <p>Quickly sign up</p>
    <p>No email-verification mail will be sent to you</p>
    <UserForm history={history} authType="register" />
  </div>
)

const RegModal = withRouter(({ setForm, setModal, history }) => {
  const unfocusPosts = () => {


    const scrollTop = document.documentElement.scrollTop



    document.body.querySelectorAll('div.container > h2').forEach((cur) => {

      const { offsetTop, offsetHeight } = document.querySelector('.modal')
      const bottom = offsetTop + offsetHeight + scrollTop
      const top = offsetTop + scrollTop

      if (cur.offsetTop >
         top && cur.offsetHeight + cur.offsetTop < bottom) {
        cur.style.color = 'transparent'
      } else cur.style.color = 'white'




    })


    document.body.querySelectorAll('div.container > p').forEach((cur) => {

      const { offsetTop, offsetHeight } = document.querySelector('.modal')
      const bottom = offsetTop + offsetHeight + scrollTop
      const top = offsetTop + scrollTop

      if (cur.offsetTop > top && cur.offsetHeight + cur.offsetTop < bottom) {
        cur.style.color = 'transparent'

      } else cur.style.color = 'white'




    })


  }

  const fixPosts = (...rest) => {

    rest.forEach((selector) => document.body.querySelectorAll(selector).forEach((cur) => cur.style = 'white'))




  }

  useEffect(() => {
    //Effect unfocus posts on scroll on initial render
    unfocusPosts()

    //Effect unfocus posts on scroll
    document.addEventListener('scroll', unfocusPosts)

    //Effect unfocus posts on hover
    document.querySelector('.modal').addEventListener('mouseover', unfocusPosts)


    return () => {
      document.querySelector('.modal').removeEventListener('mouseenter', unfocusPosts)
      document.removeEventListener('scroll', unfocusPosts)
      fixPosts('div.container > h2', 'div.container > p')
    }
  }, [])
  return (
    <div className="modal">
      <div id="closeBtn" className="modal--close-btn" onClick={() => {
        setModal(false)
      }}>X</div>
      <div className="modal__header-container">
        <h2 id="modalInfo" className="container--text-center padding--1-sides">Fill in to Register</h2>

      </div>
      <UserForm 
        setForm={setForm}
        setModal={setModal} 
        history={history} 
        authType="register" />
    </div>
  )
})

export { RegModal, Register as default }


