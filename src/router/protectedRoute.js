import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


const ProtectedRoute = ({
  isAdmin, 
  token,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    !isAdmin ?
    <Redirect to="/"/>
    :
    <div>
      <Component {...props}/>
    </div>
  )}/>
)

const mapStateToProps = (state) => ({
  isAdmin: state.authentication.user.isAdmin,
  token: state.authentication.token
})

export default connect(mapStateToProps)(ProtectedRoute)