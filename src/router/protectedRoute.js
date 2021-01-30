import React, {useState, useRef, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


const ProtectedRoute = ({
  isAdmin, 
  token,
  component: Component,
  ...rest
}) => {
  const [hasAccess, setAccess] = useState(true)
  const initialRedner = useRef(true)
  useEffect(()=> {
    if(!initialRedner.current) {
      setAccess(!!isAdmin)
    }
    if(initialRedner.current) {
      initialRedner.current = false;
    }
  }, [token, isAdmin])

  return (
    <Route {...rest} component={(props) => (
      !hasAccess ?
      <Redirect to="/"/>
      :
      <div>
        <Component {...props}/>
      </div>
    )}/>
  )
}

const mapStateToProps = (state) => ({
  isAdmin: state.authentication.user.isAdmin,
  token: state.authentication.token
})

export default connect(mapStateToProps)(ProtectedRoute)