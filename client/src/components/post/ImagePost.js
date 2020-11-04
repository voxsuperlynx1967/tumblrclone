import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './ImagePost.css'




function ImagePost({ post }) {
  const rendertype = () => {
      if (post && post !== null) {
        if (post.mediaLink) {
            debugger
            return (

                <div className="imgposts">
                    <img className="postpic" src={post.mediaLink} />
                    <div className="caption">{post.caption}</div>
                </div>
            )
        } else if (post.text) {
                return (
                    <div className="textposts">
                        <div className="title">{post.title}</div>
                        <div className="text">{post.text}</div>
                    </div>
                )
        } else {
            return (
                <div className="quoteposts">
                    <div className="quote">{post.title}</div>
                    <div className="by">{post.text}</div>
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
        {rendertype()}
        <div className="tags">
            <ul className = "taglist">
                <li>#burgers</li>
                <li>#cheese</li>
                <li>#bacon</li>
            </ul>
        </div>
        <div className="bottombar">
            <div className="notes">
                1 note
            </div>
            <div className = "buttoncontainer">
                <svg className = "bottombuttons reblog" viewBox="0 0 17 18.1" width="21" height="5" fill="var(--gray-65)"><path d="M12.8.2c-.4-.4-.8-.2-.8.4v2H2c-2 0-2 2-2 2v5s0 1 1 1 1-1 1-1v-4c0-1 .5-1 1-1h9v2c0 .6.3.7.8.4L17 3.6 12.8.2zM4.2 17.9c.5.4.8.2.8-.3v-2h10c2 0 2-2 2-2v-5s0-1-1-1-1 1-1 1v4c0 1-.5 1-1 1H5v-2c0-.6-.3-.7-.8-.4L0 14.6l4.2 3.3z"></path></svg>
                <svg className = "bottombuttons comment" viewBox="0 0 17 17" width="21" height="5" fill="var(--gray-65)"><path d="M8.7 0C4.1 0 .4 3.7.4 8.3c0 1.2.2 2.3.7 3.4-.2.6-.4 1.5-.7 2.5L0 15.8c-.2.7.5 1.4 1.2 1.2l1.6-.4 2.4-.7c1.1.5 2.2.7 3.4.7 4.6 0 8.3-3.7 8.3-8.3C17 3.7 13.3 0 8.7 0zM15 8.3c0 3.5-2.8 6.3-6.4 6.3-1.2 0-2.3-.3-3.2-.9l-3.2.9.9-3.2c-.5-.9-.9-2-.9-3.2.1-3.4 3-6.2 6.5-6.2S15 4.8 15 8.3z"></path></svg>
                <svg className = "bottombuttons heart" width="23" height="5" viewBox="0 0 20 18" fill="var(--gray-65)"><path d="M14.658 0c-1.625 0-3.21.767-4.463 2.156-.06.064-.127.138-.197.225-.074-.085-.137-.159-.196-.225C8.547.766 6.966 0 5.35 0 4.215 0 3.114.387 2.162 1.117c-2.773 2.13-2.611 5.89-1.017 8.5 2.158 3.535 6.556 7.18 7.416 7.875A2.3 2.3 0 0 0 9.998 18c.519 0 1.028-.18 1.436-.508.859-.695 5.257-4.34 7.416-7.875 1.595-2.616 1.765-6.376-1-8.5C16.895.387 15.792 0 14.657 0h.001zm0 2.124c.645 0 1.298.208 1.916.683 1.903 1.461 1.457 4.099.484 5.695-1.973 3.23-6.16 6.7-6.94 7.331a.191.191 0 0 1-.241 0c-.779-.631-4.966-4.101-6.94-7.332-.972-1.595-1.4-4.233.5-5.694.619-.475 1.27-.683 1.911-.683 1.064 0 2.095.574 2.898 1.461.495.549 1.658 2.082 1.753 2.203.095-.12 1.259-1.654 1.752-2.203.8-.887 1.842-1.461 2.908-1.461h-.001z"></path></svg>
                <svg className = "bottombuttons trash" viewBox="0 0 14 17" width="21" height="5" fill="var(--gray-65)"><path d="M12 5v9c.1.7-.3 1-1 1H3c-.5 0-.9-.3-1-1V5c0-.6-.4-1-1-1-.5 0-1 .4-1 1v9.5C0 16.1 1.4 17 3 17h8c1.8 0 3-.8 3-2.5V5c0-.6-.5-1-1-1-.6 0-1 .5-1 1z"></path><path d="M4 12s0 1 1 1 1-1 1-1V5c0-.5-.4-1-1-1-.5 0-1 .5-1 1v7zm4 0s0 1 1 1 1-1 1-1V5c0-.5-.4-1-1-1-.5 0-1 .5-1 1v7zm5-10c.5 0 1-.4 1-1 0-.5-.4-.9-1-1H1C.5.1 0 .5 0 1c0 .6.6 1 1.1 1H13z"></path></svg>
                <svg className = "bottombuttons edit" viewBox="0 0 17.6 17.6" width="21" height="5" fill="var(--gray-65)"><path d="M5.3 13.8l-2.1.7.7-2.1L10.3 6l1.4 1.4-6.4 6.4zm6.4-9.3l-1.4-1.4-1.4 1.4-6.7 6.7-.2.5-2 5.9 3.8-1.3 2.1-.7.4-.1.3-.3 7.8-7.8c.1 0-2.7-2.9-2.7-2.9zm5.6-1.4L14.5.3c-.4-.4-1-.4-1.4 0l-1.4 1.4L15.9 6l1.4-1.4c.4-.5.4-1.1 0-1.5"></path></svg>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePost;
