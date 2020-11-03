import React, {useState, useEffect, useReducer} from 'react'
import uuid from 'uuid/v4'
import {Link} from 'react-router-dom'
import Image from './Image'
import UploadImage from './UploadImage'
import deleteImage from '../utils/deleteImage'
import {patchPost, addPost} from '../redux/generators/posts'
import TypePostForm from './TypePostForm'
import updatePost from '../utils/updatePost'
import descriptionReducer from '../hooks/reducers/descriptionReducer';
import Description from "./Description";
import getPost from "../utils/getPost";
import createDescription from "../utils/createDescription";
import removeDescription from "../utils/removeDescription";

const Post = ({dispatchDraft, history, dispatch, title, content, isAdmin, id, pics, token, published, _id}) => {

    const [descriptions, dispatchDescriptions] = useReducer(descriptionReducer, [])
    const [desField, setDesField] = useState(false)

    const startRemovePicHandler = (imageId) => {
        deleteImage(id || _id, imageId, token)
            .then(({published, pics}) => {
                dispatch(patchPost(id, {published, pics}))

                if (dispatchDraft) {

                    dispatchDraft({type: 'REMOVE_IMAGE', id: id || _id, image: imageId})
                }
            })
    }

    const updateDraftHandler = (update) => {

        updatePost(update, token, id || _id, true)
            .then(({content, title, _id: id, owner, pics, published}) => {
                if (published) {
                    dispatch(addPost({content, title, id, owner, pics, published}))
                    history.push('/')
                } else {
                    setUpdateMsg('Post updated!')
                    setTimeout(() => {
                        setUpdateMsg('')
                    }, 2000)
                }
            })
    }

    useEffect(() => {
        getPost(id)
            .then(data => data.pics.forEach((cur, index) => {
                cur.descriptions.forEach((des) => {
                    console.log(des)
                    dispatchDescriptions({type: 'ADD_DESCRIPTION', descriptions: {...des}})
                })

            }))
        return () => {
            console.log('I AM RERENDERIN')
        }
    }, [])

    const [upload, setUpload] = useState(false)
    const [updateMsg, setUpdateMsg] = useState('')
    return (
        <div className="post container">
            {updateMsg &&
            <div className="container__content-center">
                <p>{updateMsg}</p>
                <button className="clear-button__update" onClick={() => setUpdateMsg('')}>X</button>
            </div>}
            {isAdmin && !published ?
                <TypePostForm isDraft={true} submitHandler={updateDraftHandler}
                              post={{title, content, id, pics, published}}/>
                :
                <div className="container container--text-center">
                    <h2>{title}</h2>
                    <p>{content}</p>
                </div>
            }

            {pics && pics.map(cur =>
                <div key={cur.image}>
                    <Image
                        token={token}
                        pics={pics} post={id}
                        startRemovePicHandler={startRemovePicHandler}
                        isAdmin={isAdmin}
                        id={cur.image}
                        src={`${process.env.BASE_URL}/posts/image/${cur.image}`}
                    />
                    {isAdmin &&
                    <div key={uuid()} className="container container--text-center">
                        <span className="description__show" onClick={() => {
                            setDesField(!desField)
                        }}>&#9679; &#9679; &#9679;</span>
                        {desField &&
                        <form className="description__form" onSubmit={(e) => {
                            e.preventDefault()
                            createDescription({
                                paragraph: e.target.elements.desc.value,
                                image: cur.image
                            }, id, cur.image, token)
                                .then((data) => {
                                    setDesField(false)
                                    const description = data.pics.find(pic => pic.image === cur.image)
                                    getPost(data._id)
                                        .then(post => {
                                            const description = post.pics.find(pic => pic.image === cur.image)
                                            description.descriptions.forEach((desc) => {


                                                if (!descriptions.some(current => current._id === desc._id)) {
                                                    dispatchDescriptions({
                                                        type: 'ADD_DESCRIPTION',
                                                        descriptions: {...desc}
                                                    })
                                                }
                                            })
                                        })
                                    // description.descriptions.forEach((desc) => {
                                    //     // dispatchDescriptions({type: 'ADD_DESCRIPTION', descriptions: desc})
                                    //     console.log(desc)
                                    //     console.log({type: 'ADD_DESCRIPTION', descriptions: desc})
                                    // })
                                })

                        }}>
                            <textarea placeholder="describe the picture" className="description__form--input" name="desc"/>
                            <input className="description__add" type="submit" value="Add"/>
                        </form>}
                    </div>}
                    {descriptions.map(desc => {
                        if (cur.image === desc.image) {

                            return (
                                <div key={cur.image} className={isAdmin ? "container--flex description admin" : "container--flex description"}>
                                    <Description paragraph={desc.paragraph}/>
                                    {isAdmin && <span onClick={() => {
                                        removeDescription(id, cur.image, desc._id, token )
                                            .then(data => dispatchDescriptions({type:'REMOVE_DESCRIPTION', id:desc._id}))
                                    }} className="container--flex" className="description__sidebtn">X</span>}
                                </div>)
                        }


                    })}
                </div>
            )
            }
            {isAdmin && published &&
            <div className="container__flex">
                <Link className="link-button__edit" to={`/edit/${id}`}>Edit</Link>
                <a className="link-button__upload" href="#" onClick={(e) => {
                    e.preventDefault()
                    setUpload(!upload)
                }}>Upload Image?</a>
            </div>
            }

            <div className="container container__content-center-x2 column">
                {isAdmin && !published &&
                <a className="link-button__upload button--pri marginb--1" href="#" onClick={(e) => {
                    e.preventDefault()
                    setUpload(!upload)
                }}>Upload Image?</a>
                }
                {isAdmin && upload &&
                <UploadImage published={published} pics={pics} dispatchDraft={dispatchDraft} setUpload={setUpload}
                             id={id || _id}/>}
            </div>


        </div>
    )
}

export default Post