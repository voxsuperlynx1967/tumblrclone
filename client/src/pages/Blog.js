import React, { useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import MoreIcon from '@material-ui/icons/MoreVert';
import { logout } from '../store/auth';
import { fetchPostsById } from '../store/post';
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import YumblrLogoSmall from '../components/auth/YumblrLogoSmall';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import BlogActionsBar from '../components/post/BlogActionsBar';
import ImagePost from '../components/post/ImagePost';
import { fetchLikes } from '../store/likes';
// or
import { Avatar } from '@material-ui/core';
import NavBar from '../components/NavBar';
import { useParams } from "react-router-dom";
import { Container } from '@material-ui/core';
import {NavLink} from 'react-router-dom';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
        font: "14px Helvetica Neue",
        textAlign: "right",
      }
    },
  },
});
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    height: "100%",
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  menu: {
    background: "#00000012",
  },
  search: {

    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '448px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    font: "Helvetica Neue",
    fontWeight: "bold",
    fontColor: "white",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: "center",
      height: "10%",
      width: "37.5%",
      position: "absolute",
      left: "43.75%",
      top: "20%",
      backgroundColor: "white",
      borderRadius: "5px",
    }
}));



export default function Blog() {
  let { id } = useParams();
  const currentUser = useSelector(state => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUserId = currentUser.id ? currentUser.id : 4
  useEffect(() => {
    dispatch(fetchLikes(currentUserId));
  }, [dispatch, currentUserId]);
  useEffect(() => {
    dispatch(fetchPostsById(id));
  }, [dispatch, id]);
  const post = useSelector(state => state.post);
  const postlist = post.posts
  console.log(postlist)


  const postrender = () => {
        const postsli = postlist ? postlist : []
        console.log(postsli)
        const list1 = []
        for (let i = 0; i < postsli.length; i++) {

          list1.push(<ImagePost post={postsli[i]}/>)
        }
        console.log(list1)
        return list1;

  }

  const renderactions = () => {
    // console.log(currentUserId, id)
    if (currentUserId === Number(id)) {
        console.log(currentUserId, id)
        return (
            <BlogActionsBar/>
        )
    } else {
        return (
            <Container classes={{ root: classes.container }}>
                <div className="me">{postlist ? (postlist[0].Poster ? postlist[0].Poster.username : "username") : "username"}.tumblr</div>
            </Container>
        )
    }
  }


  return (
    <>
      <div className="page">

        <NavBar/>
        {renderactions()}
        {/* <div className="postsContainer"> */}
            <div id ="posts">
                {postrender()}
             </div>
        {/* </div> */}

    </div>
    <div className="sideBar">
        <div className="blogs">
            <div className="blogsTitle">
                Recommended Blogs
            </div>
            <NavLink className="linkz" to={`/blogs/1`}>
            <span className="recblog"> <Avatar alt="Guy" src="https://yumblr.s3.amazonaws.com/guyfieri.jpeg" />
                guyfieri</span>
            </NavLink>
            <NavLink className="linkz" to={`/blogs/3`}>
            <span className="recblog"><Avatar alt="Bobby" src="https://yumblr.s3.amazonaws.com/bobbyflay.jpg" />fishflay</span>
            </NavLink>
            <NavLink className="linkz" to={`/blogs/2`}>
            <span className="recblog"><Avatar alt="Gordon" src="https://yumblr.s3.amazonaws.com/chefgordon.jpg" />bigchef </span>
            </NavLink>

        </div>
    </div>

  </>
  );
}
