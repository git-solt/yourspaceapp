import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Main from '../components/Main'
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'
import Drafts from '../components/Drafts'

const AppRouter = () => (


    <Switch>
      <Route path="/" component={Main} exact={true}/>
      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/login" component={Login} />
      <ProtectedRoute path="/create" component={CreatePost}/>
      <ProtectedRoute path="/edit/:id" component={EditPost} />
      <ProtectedRoute path="/drafts" component={Drafts} />
    </Switch>

)


export default AppRouter