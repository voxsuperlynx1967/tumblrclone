import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './ImagePost.css'




function ImagePost({ post }) {
  const currentUserName = useSelector(state => state.auth.username);
  return (
    <div>
      <div className="box">
        <div className = "formtitlebar">
          <label>
            {post.User.username}
          </label>
          <MoreHorizIcon />
        </div>
        <div>
          <img className="postpic" src={post.mediaLink} />
        </div>
        <div className="bottombar">
          <FavoriteBorderIcon/>
        </div>
      </div>
    </div>
  )
}

export default ImagePost;