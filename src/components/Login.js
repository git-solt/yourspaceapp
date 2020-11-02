import React from 'react'
import {connect} from 'react-redux'
import UserForm from './UserForm'

const Login = ({history, dispatch}) => (
  <div>
    <h3>Sign in</h3>
    <UserForm dispatch={dispatch} history={history}/>
  </div>
)


export default connect()(Login)