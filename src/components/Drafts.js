import React, { useEffect, useReducer, useState} from 'react'
import { connect } from 'react-redux'
import { fetchDrafts } from '../utils/fetchPosts'
import Post from './Post'
import reducer from '../hooks/reducers/draftReducer'
import LoadPage from './LoadPage'
import ToMain from './ToMain'



const Drafts = (props) => {
  const [drafts, dispatchDraft] = useReducer(reducer, [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDrafts(props.user.token)
      .then(drafts => {
        drafts.forEach(cur => dispatchDraft({ type: 'ADD_DRAFT', draft: { ...cur } }))
        setLoading(false)
      })
  }, [])



  return (
    <div className="container">
      <ToMain/>
      <h1>Your unpublished posts</h1>
      {loading && <LoadPage />}
      {drafts.map(cur => <Post dispatchDraft={dispatchDraft} history={props.history} dispatch={props.dispatch} token={props.user.token} isAdmin={props.user.user.isAdmin} key={cur._id} {...cur} />)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.authentication
})

export default connect(mapStateToProps)(Drafts)
