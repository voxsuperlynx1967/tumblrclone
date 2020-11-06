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
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: "10%",
    width: "37.5%",
    position: "absolute",
    left: "43.75%",
    top: "20%",
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
    height: "65%",
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
  const [postType, setPostType] = useState('')
  const [mediaLink, setMediaLink] = useState('');
  const [caption, setCaption] = useState('')
  const [filename, setFilename] = useState('Choose File');
  const currentUserId = useSelector(state => state.auth.id);
  const currentUserName = useSelector(state => state.auth.username)
  const dispatch = useDispatch();
  const history = useHistory();
  let tagList = []
  let reblogUserId = null
  const handleKeyUp = (e) => {
    if(e.keyCode == 32 || e.keyCode == 13){
        e.preventDefault()
        let i = e.target.value
        if (i[0] === "#") {
            i = i.substring(0);
        }
        console.log(i)
        tagList.push(i)
        e.target.value = ''
        const tagspan = document.createElement("span")
        tagspan.innerHTML = "#" + i
        console.log(e.target.value)
        tagspan.classList.add("tags2")
        tagspan.setAttribute("id", ("tag" + tagList.length))
        tagspan.addEventListener("click", (e) => {
            const index = tagList.indexOf(e.target.innerHTML)
            tagList.splice(index, 1)
            document.getElementById(e.target.id).remove()
        })
        document.getElementById("tagList").appendChild(tagspan)
    }



}

const handleKeyUp2 = (e) => {
    if(e.keyCode == 32 || e.keyCode == 13){
        e.preventDefault()
        let i = e.target.value
        if (i[0] === "#") {
            i = i.substring(0);
        }
        console.log(i)
        tagList.push(i)
        e.target.value = ''
        const tagspan = document.createElement("span")
        tagspan.innerHTML = "#" + i
        console.log(e.target.value)
        tagspan.classList.add("tags2")
        tagspan.setAttribute("id", ("tag" + tagList.length))
        tagspan.addEventListener("click", (e) => {
            const index = tagList.indexOf(e.target.innerHTML)
            tagList.splice(index, 1)
            document.getElementById(e.target.id).remove()
        })
        document.getElementById("tagList2").appendChild(tagspan)
    }



}

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFilename(e.target.files[0].name)
    handleSubmitz(file)
  }

  const handleSubmitz = async (file) => {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file)
    formData.append('id', currentUserId)

    try {
      const res = await axios.post('/api/photo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const link = await res.data
      const g = document.querySelector(".photoupload2");
      g.style.paddingTop = "30px";
      g.style.paddingBottom = "30px";
      const p = document.getElementById("caption2");
      p.classList.remove("hidden");
      document.querySelector(".yourtags2").classList.remove("hidden")
      document.querySelector(".tagList2").classList.remove("hidden")
      document.querySelector(".makeStyles-paper-13").style.height = "75%";
      document.getElementById("addmepic").classList.add("postedpic")
      setMediaLink(link.url)
      document.getElementById("hideme").classList.add("hidden")
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.message)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    debugger
    await dispatch(createPost( postType, currentUserId, title, text, mediaLink, caption, reblogUserId, tagList));
    dispatch(fetchPosts())
    handleClose();
    handleClose1();
  }


  const handleOpen = () => {
    setPostType("image");
    setOpen(true);
    console.log("hi")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen1 = () => {
    setPostType("text");
    setOpen1(true);
    console.log("hello")
    // console.log(postType)
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const iconClick = () => {
    const g = document.querySelector(".photoupload");
    const h = document.querySelector(".photoupload2");
    h.classList.add("hidden")
    const x = document.getElementById("urlicon");
    x.style.display = "none";
    const photolabel = document.getElementById("photolabel");
    photolabel.style.display = "none";
    const z = document.getElementById("photoicon");
    z.style.display = "none";
    const photolabel2 = document.getElementById("photolabel2");
    photolabel2.style.display = "none";
    const y = document.getElementById("whatever");
    y.classList.remove("hidden");
    const p = document.getElementById("caption1");
    p.classList.remove("hidden");
    g.style.background = "white";
    g.style.paddingBottom = "70px";
    g.style.paddingTop= "70px";
    // g.style.width = "100%"
    document.querySelector(".yourtags1").classList.remove("hidden")
    document.querySelector(".tagList1").classList.remove("hidden")
  };

  const iconClick2 = () => {
    const g = document.querySelector(".photoupload2");
    const h = document.querySelector(".photoupload");
    h.classList.add("hidden")
    const x = document.getElementById("photoicon");
    x.style.display = "none";
    const z = document.getElementById("urlicon");
    z.style.display = "none";
    const photolabel = document.getElementById("photolabel");
    photolabel.style.display = "none";
    const photolabel2 = document.getElementById("photolabel2");
    photolabel2.style.display = "none";
    const y = document.getElementById("hideme");
    y.classList.remove("hidden");
    g.style.background = "white";
    g.style.width = "100%"
  };


  return (
    <Container classes={{ root: classes.container }}>
        <div className="icontext">
        <TextFieldsIcon id="posticon" onClick={handleOpen1}>
        </TextFieldsIcon>
        <span className="icontext-text">
            Text
        </span>
        </div>
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
                    {currentUserName}
                </label>
                <SettingsIcon />
              </div>
              <form className="textform" onSubmit={handleSubmit}>
                  <div className = "textupload">
                    <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    id="title"/>
                    <textarea
                    placeholder="Your text here"
                    class="yourtext"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    id="title"/>
                    <input
                    placeholder="#tags"
                    class="yourtags"
                    onKeyUp={handleKeyUp}
                    id="taginput"/>
                    <div id="tagList" className="tagList"></div>
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
      <div className="icontext">
      <AddAPhotoIcon
           className="photoicon"
          id="posticon"
          onClick={handleOpen}
          >

        </AddAPhotoIcon>
        <span className="icontext-text">
            Photo
        </span>
        </div>

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
                  {currentUserName}
                </label>
                <SettingsIcon />
              </div>
              <form onSubmit={handleSubmit}>
                  <div className="photouploadContainer">

                    <div className="photoupload">

                        <LanguageIcon id="urlicon" onClick={iconClick}/>
                        <label id="photolabel">Add photo from web</label>
                        <input id="whatever" className="yourtext hidden"
                        placeholder = "Paste a URL"
                        onChange={e => setMediaLink(e.target.value)}
                        />
                        <input
                        placeholder="Add a caption if you like"
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        id="caption1"
                        className="yourtext hidden"/>
                        <input
                        placeholder="#tags"
                        className="yourtags1 hidden"
                        onKeyUp={handleKeyUp}
                        id="taginput"/>
                        <div id="tagList" className="tagList1"></div>



                    </div>

                    <div className="photoupload2">
                        <AddAPhotoIcon id="photoicon" onClick={iconClick2}/>
                        <label id="photolabel2">Upload photo</label>
                        <img id="addmepic" src={mediaLink}/>
                        <div id ="hideme" className='upload-photo hidden'>
                        <input type='file' className='upload-photo' id='customPhoto'
                            onChange={handleFileChange}
                        />
                        </div>
                        <input
                        placeholder="Add a caption if you like"
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        id="caption2"
                        className="yourtext2 hidden"/>
                        <input
                        placeholder="#tags"
                        className="yourtags2 hidden"
                        onKeyUp={handleKeyUp2}
                        id="taginput"/>
                        <div id="tagList2" className="tagList2"></div>


                    </div>

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
      <div className="icontext">
      <FormatQuoteIcon className = "quoteicon" id="posticon"/>
      <span className="icontext-text">
            Quote
        </span>
      </div>
    </Container>


  )
}

export default BlogActionsBar;
