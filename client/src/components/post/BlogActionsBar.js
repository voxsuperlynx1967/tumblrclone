import TextFieldsIcon from '@material-ui/icons/TextFields';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPosts } from '../../store/post';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import './BlogActionsBar.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SettingsIcon from '@material-ui/icons/Settings';
import LanguageIcon from '@material-ui/icons/Language';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: "10%",
    width: "45%",
    position: "absolute",
    top: "20%",
    left: "27%",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "Helvetica Neue,HelveticaNeue,Helvetica,Arial,sans-serif;",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: "0px",
    width: "50%",
    height: "50%",
  },
  muiButton: {
    background: "lightblue",
  }
}));





function BlogActionsBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const currentUserId = useSelector(state => state.auth.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    await dispatch(createPost( "image", currentUserId, mediaLink ));
    handleClose();
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    await dispatch(createPost( "text", 1 ));
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const iconClick = () => {
    const g = document.querySelector(".photoupload");
    const x = document.getElementById("urlicon");
    x.style.display = "none";
    const photolabel = document.getElementById("photolabel");
    photolabel.style.display = "none";
    const y = document.getElementById("whatever");
    y.classList.remove("hidden");
    g.style.background = "white";
  };


  return (
    <Container classes={{ root: classes.container }}>
        <AddAPhotoIcon
          id="posticon"
          onClick={handleOpen}
          >

        </AddAPhotoIcon>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className = "tubmlrpoststyle">
              <div className = "formtitlebar">
                <label>
                  guyfieri
                </label>
                <SettingsIcon />
              </div>
                <form onSubmit={handleSubmit1}>
                  <div className="photoupload">
                    <LanguageIcon id="urlicon" onClick={iconClick}/>
                    <label id="photolabel">Add photo from web</label>
                    <input id="whatever" className="yourtext hidden"
                      placeholder = "Paste a URL"
                      onChange={e => setMediaLink(e.target.value)}
                     />

                  </div>
                  {/* <form>
                    <label>
                      Image URL
                      <input type="text" name="imageurl" />
                    </label>
                    <label>
                      Caption
                      <input type="text" name="caption" />
                    </label>
                  </form> */}
                  <div className="bottombar">
                    <button className="post" type="submit">
                      Post
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </Fade>
      </Modal>
        <TextFieldsIcon id="posticon" onClick={handleOpen1}>
        </TextFieldsIcon>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open1}>
          <div className={classes.paper}>
            <div className = "tubmlrpoststyle">
              <div className = "formtitlebar">
                <label>
                  Username
                </label>
                <SettingsIcon />
              </div>
              <form className="textform" onSubmit={handleSubmit2}>
                  <div className = "textupload">
                    <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    id="title"/>
                    <textarea
                    placeholder="Your text here"
                    class="yourtext"
                    value={title}
                    onChange={e => setText(e.target.value)}
                    id="title"/>
                    {/* <form>
                      <label>
                        Image URL
                        <input type="text" name="imageurl" />
                      </label>
                      <label>
                        Caption
                        <input type="text" name="caption" />
                      </label>
                    </form> */}
                  </div>
                  <div className="bottombar">
                    <button className="post" type="submit">
                      Post
                    </button>
                  </div>
                </form>
              </div>
          </div>
        </Fade>
      </Modal>
    </Container>


  )
}

export default BlogActionsBar;
