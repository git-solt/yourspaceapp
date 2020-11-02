import React, { useState, useEffect } from 'react'
import startAuthentication from '../utils/startAuthenticating'
import { setAuth } from '../redux/generators/auth'
const UserForm = (props) => {
  const [error, setError] = useState('')
  const [pwValue, setPwValue] = useState('')
  const [regInfo, setRegInfo] = useState('')
  const [confirmed, setConfirmed] = useState(false)



  useEffect(() => {
    console.log(pwValue)
  }, [pwValue])

  const userfieldStyle = props.authType === 'register' ? 'userfield userfield--register' : 'userfield'
  const userfieldUserNameStyle = props.authType === 'register' ? 'userfield userfield--register userfield--username' : 'userfield'
  const buttonStyle = props.authType === 'register' ? 'button button--register' : 'button'

  const form = document.querySelector('#loginDD')
  const info = document.querySelector('#modalInfo')
  const pwfield = document.querySelector('input[name="password"]')
  const emailfield = document.querySelector('input[name="email"]')
  const unfield = document.querySelector('input[name="username"]')
  const regbutton = document.querySelector('input[name="submitButton"]')
  const closeBtn = document.querySelector('#closeBtn')

  


  return (
    <div id="formRoot" className="container--text-center">
      {error && <span className="msg--alert msg--tiny">{error}</span>}


      <form className="container__content-center-x2 column" onSubmit={(e) => {
        e.preventDefault()

        const email = e.target.elements.email.value
        const password = e.target.elements.password.value
        const userName = e.target.elements.username ? e.target.elements.username.value : undefined


        const request = {
          email,
          password,
          userName
        }


        startAuthentication(request, props.authType)
          .then((data) => {

            if (data === undefined) {
              throw new Error()
            }

            if (data.error) {
              throw new Error(data.error.message)
            }

            if (props.authType !== 'register' && data) {
              localStorage.setItem('jwt', data.token)
              localStorage.setItem('currentUser', JSON.stringify(data.user))
              const check = localStorage.getItem('jwt') === data.token
              props.dispatch(setAuth(data.user, data.token))
            }

            if (props.setForm) {

              setRegInfo('')
              info.textContent = 'Success'
              info.classList.add('msg--registered', 'msg--transend')
              pwfield.classList.add('userfield--register-done-bg', 'userfield--register-done-text')
              emailfield.classList.add('userfield--register-done-bg', 'userfield--username-done', 'userfield--welcome')
              unfield.classList.add('userfield--register-done-bg', 'userfield--username-done')
              regbutton.classList.add('userfield--register-done-bg', 'userfield--register-done-text', 'button__hide')
              closeBtn.classList.add('model--close-btn-hide')
              const nick = unfield.value
              emailfield.placeholder = 'Welcome'
              emailfield.value = ''
              unfield.placeholder = nick
              unfield.value = ''
              unfield.disabled = true
              pwfield.disabled = true
              emailfield.disabled = true
              regbutton.disabled = true;

              setTimeout(() => {
                props.setForm(true)
                props.setModal(false)
              }, 4000)



              props.history.push('/')
            } else {

              props.history.push('/')
            }



          })
          .catch(error => {
            if (props.authType !== 'register') {
              setError('No matching credentials')
              form.classList.add('form--error')
              pwfield.value = ''
              setTimeout(() => form.classList.remove('form--error'), 1000)
              console.log('THIS: ', error)
            } else {
              const pwErr = error.toString().toLowerCase().includes('password'.toLowerCase())
              if (pwErr) pwfield.value = ''

              const errorMsg = pwErr ?
                'Password require a minimum of 6 characters, including atleast one number & one uppercase character'
                :
                'Please provide a valid email'
              info.textContent = errorMsg

            }


          })
      }}>
        <input className={userfieldStyle} type="text" name="email" placeholder="email" required />
        {regInfo && <span className="msg--info msg--tiny msg--constrict">{regInfo}</span>}
        <input className={userfieldStyle} type="password" name="password" placeholder="password" required onInput={(e) => {
          setPwValue(e.target.value)
          console.log(confirmed)
          if (e.target.value && !e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/) && props.authType === 'register') {
            setRegInfo('Minimum 6 characters, including a number & an uppercase letter')
          } else {
            setRegInfo('')
            setConfirmed(false)

          }
        }}/>
        {
          props.authType === 'register' && 
          pwValue.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/) &&
          !confirmed &&
          <input className={userfieldStyle} type="password" name="validate" placeholder="confirm password" required onInput={(e) => {
            if (e.target.value === pwValue && pwValue.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/)) {
              setRegInfo('Password confirmed')
              e.target.value = ''
              setConfirmed(true)
              
            } else {
              setRegInfo('The passwords don\'t match')
            }
           
          }}/>}
        {props.authType === 'register' &&
          <input className={userfieldUserNameStyle} type="text" name="username" placeholder="username" required />}
        <input disabled={props.authType  === 'register' && !confirmed} className={buttonStyle} type="submit" name="submitButton" value={props.authType === 'register' ? 'Register' : 'Login'} />
      </form>
    </div>
  )
}

export default UserForm

