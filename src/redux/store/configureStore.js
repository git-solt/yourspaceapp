import {createStore, combineReducers} from 'redux'
import postReducer from '../reducers/postReducer'
import authReducer from '../reducers/authReducer'
import filterReducer from '../reducers/filterReducer'








const store = createStore(combineReducers({
  posts: postReducer,
  authentication: authReducer,
  filter: filterReducer
}))



export default store

// store.dispatch(addPost('First post', 'This is my first', false))
// store.dispatch({type: 'LOGIN', user: {id: '2189218', nick: 'michaelAjax', isAdmin: true}})


// console.log(store.getState())