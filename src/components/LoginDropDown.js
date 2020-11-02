import React from 'react'
import UserForm from './UserForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const LoginDropDown = ({ history, dispatch }) => (
  <div id="loginDD" className="formtest container container__content-center-x2 column">
    <UserForm history={history} dispatch={dispatch} />
  </div>
)



export default withRouter(connect()(LoginDropDown))