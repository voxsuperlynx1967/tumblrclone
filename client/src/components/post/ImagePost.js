import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './ImagePost.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { fetchLikes } from '../../store/likes';
import { createPost } from '../../store/post';
import { fetchPosts } from '../../store/post';





function ImagePost({ post }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(`${post.title}`);
  const [text, setText] = useState(`${post.text}`);
  const rendertype = () => {
      if (post && post !== null) {
        if (post.mediaLink) {
            debugger
            return (

                <div className="imgposts">
                    <img className="postpic" src={post.mediaLink} />
                    <div className="textposts">
                        <div className="caption">{post.caption}</div>
                    </div>
                </div>
            )
        } else if (post.postType === "text") {
                return (
                    <div className="textposts">
                        <div className="title">{post.title}</div>
                        <div className="text">{post.text}</div>
                    </div>
                )
        } else {
            return (
                <div className="textposts">
                    <div className="quote">{post.title}</div>
                    <div className="text">{post.text}</div>
                </div>
            )

        }
      } else {
          return (
              <div>

              </div>
          )
      }
  }

  const rendertags = () => {
      if (post.Tags) {
        const list1 = []
        if (post.Tags.length > 0) {

            for (let i = 0; i < post.Tags.length; i++) {
                list1.push(<li>#{post.Tags[i].Tag.title}</li>)
            }
        }
        return list1
      } else {
          return (
            <div>

            </div>
        )
      }
  }
  const likes = useSelector(state => state.likes)
  const currentUser = useSelector(state => state.auth);
  const userId = currentUser.id
  const postId = post.id
  const like = async () => {
    const res = await fetch(`/api/likes`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        },
        body: JSON.stringify({ postId, userId})

    });
    dispatch(fetchLikes(userId));
  }

  const unlike = async () => {
    const res = await fetch(`/api/likes/`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
            "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        },
        body: JSON.stringify({ postId, userId })

    });
    dispatch(fetchLikes(userId));
  }
  const likerender = () => {
      if (likes) {
        for (let i = 0; i < likes.length; i++) {
            console.log(likes[i].postId, post.id)
            if (likes[i].postId === post.id) {
                return (
                    <FavoriteIcon onClick={unlike} id="liked" className="heart"/>
                )

            }
        }

      }

      return (
        <FavoriteBorderIcon onClick={like} id="unliked" className="heart"/>

      )


  }

  const currentUserName = currentUser.username
  console.log(currentUserName)
  const rendervgs = () => {
      console.log("Hi")
      if (currentUserName === post.Poster.username) {

          return (
            <>
                <svg className = "bottombuttons trash" viewBox="0 0 14 17" width="21" height="5" fill="var(--gray-65)"><path d="M12 5v9c.1.7-.3 1-1 1H3c-.5 0-.9-.3-1-1V5c0-.6-.4-1-1-1-.5 0-1 .4-1 1v9.5C0 16.1 1.4 17 3 17h8c1.8 0 3-.8 3-2.5V5c0-.6-.5-1-1-1-.6 0-1 .5-1 1z"></path><path d="M4 12s0 1 1 1 1-1 1-1V5c0-.5-.4-1-1-1-.5 0-1 .5-1 1v7zm4 0s0 1 1 1 1-1 1-1V5c0-.5-.4-1-1-1-.5 0-1 .5-1 1v7zm5-10c.5 0 1-.4 1-1 0-.5-.4-.9-1-1H1C.5.1 0 .5 0 1c0 .6.6 1 1.1 1H13z"></path></svg>
                <svg className = "bottombuttons edit" viewBox="0 0 17.6 17.6" width="21" height="5" fill="var(--gray-65)"><path d="M5.3 13.8l-2.1.7.7-2.1L10.3 6l1.4 1.4-6.4 6.4zm6.4-9.3l-1.4-1.4-1.4 1.4-6.7 6.7-.2.5-2 5.9 3.8-1.3 2.1-.7.4-.1.3-.3 7.8-7.8c.1 0-2.7-2.9-2.7-2.9zm5.6-1.4L14.5.3c-.4-.4-1-.4-1.4 0l-1.4 1.4L15.9 6l1.4-1.4c.4-.5.4-1.1 0-1.5"></path></svg>
            </>
          )
      }


  }

  const rendertitlebar = () => {
      if (post.Reblog) {
          return (
            <>
            <div className = "formtitlebar2">
                <div className="reblogsection">
                    <label>
                    {post.Poster.username}
                    <svg className = "bottombuttons2 reblogtiny" viewBox="0 0 17 18.1" width="21" height="5" fill="var(--gray-65)"><path d="M12.8.2c-.4-.4-.8-.2-.8.4v2H2c-2 0-2 2-2 2v5s0 1 1 1 1-1 1-1v-4c0-1 .5-1 1-1h9v2c0 .6.3.7.8.4L17 3.6 12.8.2zM4.2 17.9c.5.4.8.2.8-.3v-2h10c2 0 2-2 2-2v-5s0-1-1-1-1 1-1 1v4c0 1-.5 1-1 1H5v-2c0-.6-.3-.7-.8-.4L0 14.6l4.2 3.3z"></path></svg>
                    {post.Reblog.username}
                    </label>
                </div>
                <MoreHorizIcon />
            </div>
            <div className = "formtitlebar">
            <label>
              {post.Reblog.username}
            </label>
            {/* <MoreHorizIcon /> */}
            </div>
          </>

          )
      } else {
          return (
            <div className = "formtitlebar">
            <label>
              {post.Poster.username}
            </label>
            <MoreHorizIcon />
             </div>
          )
      }
  }
  const reblog = async (e) => {
    e.preventDefault()
    debugger
    const postType = "reblog"
    const reblogUserId = post.userId
    let mediaLink
    if (post.mediaLink) {
        mediaLink = post.mediaLink
    } else {
        mediaLink = ''
    }
    let caption
    if (post.caption) {
        caption = post.caption
    } else {
        caption = ''
    }

    await dispatch(createPost( postType, userId, title, text, mediaLink, caption, reblogUserId ));
    dispatch(fetchPosts())
  }
  return (
    <div>
      <div className="box">
        {rendertitlebar()}
        {rendertype()}
        <div className="tags">
            <ul className = "taglist">
                {rendertags()}
            </ul>
        </div>
        <div className="bottombar">
            <div className="notes">
                {post.noteCount ? post.noteCount + " notes" : ""}
            </div>
            <div id ="squeezeme" className = "buttoncontainer">

                <svg onClick={reblog} className = "bottombuttons reblog" viewBox="0 0 17 18.1" width="21" height="5" fill="var(--gray-65)"><path d="M12.8.2c-.4-.4-.8-.2-.8.4v2H2c-2 0-2 2-2 2v5s0 1 1 1 1-1 1-1v-4c0-1 .5-1 1-1h9v2c0 .6.3.7.8.4L17 3.6 12.8.2zM4.2 17.9c.5.4.8.2.8-.3v-2h10c2 0 2-2 2-2v-5s0-1-1-1-1 1-1 1v4c0 1-.5 1-1 1H5v-2c0-.6-.3-.7-.8-.4L0 14.6l4.2 3.3z"></path></svg>
                {/* <svg className = "bottombuttons comment" viewBox="0 0 17 17" width="21" height="5" fill="var(--gray-65)"><path d="M8.7 0C4.1 0 .4 3.7.4 8.3c0 1.2.2 2.3.7 3.4-.2.6-.4 1.5-.7 2.5L0 15.8c-.2.7.5 1.4 1.2 1.2l1.6-.4 2.4-.7c1.1.5 2.2.7 3.4.7 4.6 0 8.3-3.7 8.3-8.3C17 3.7 13.3 0 8.7 0zM15 8.3c0 3.5-2.8 6.3-6.4 6.3-1.2 0-2.3-.3-3.2-.9l-3.2.9.9-3.2c-.5-.9-.9-2-.9-3.2.1-3.4 3-6.2 6.5-6.2S15 4.8 15 8.3z"></path></svg> */}
                {likerender()}
                {rendervgs()}
                {/* <svg className = "bottombuttons trash" viewBox="0 0 14 17" width="21" height="5" fill="var(--gray-65)"><path d="M12 5v9c.1.7-.3 1-1 1H3c-.5 0-.9-.3-1-1V5c0-.6-.4-1-1-1-.5 0-1 .4-1 1v9.5C0 16.1 1.4 17 3 17h8c1.8 0 3-.8 3-2.5V5c0-.6-.5-1-1-1-.6 0-1 .5-1 1z"></path><path d="M4 12s0 1 1 1 1-1 1-1V5c0-.5-.4-1-1-1-.5 0-1 .5-1 1v7zm4 0s0 1 1 1 1-1 1-1V5c0-.5-.4-1-1-1-.5 0-1 .5-1 1v7zm5-10c.5 0 1-.4 1-1 0-.5-.4-.9-1-1H1C.5.1 0 .5 0 1c0 .6.6 1 1.1 1H13z"></path></svg>

                <svg className = "bottombuttons edit" viewBox="0 0 17.6 17.6" width="21" height="5" fill="var(--gray-65)"><path d="M5.3 13.8l-2.1.7.7-2.1L10.3 6l1.4 1.4-6.4 6.4zm6.4-9.3l-1.4-1.4-1.4 1.4-6.7 6.7-.2.5-2 5.9 3.8-1.3 2.1-.7.4-.1.3-.3 7.8-7.8c.1 0-2.7-2.9-2.7-2.9zm5.6-1.4L14.5.3c-.4-.4-1-.4-1.4 0l-1.4 1.4L15.9 6l1.4-1.4c.4-.5.4-1.1 0-1.5"></path></svg> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePost;
