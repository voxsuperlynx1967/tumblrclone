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
import { fetchPosts } from '../store/post';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import YumblrLogoSmall from '../components/auth/YumblrLogoSmall';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import BlogActionsBar from '../components/post/BlogActionsBar';
import ImagePost from '../components/post/ImagePost';
import { fetchLikes } from '../store/likes';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      label: {
        textTransform: "none",
        font: "14px Helvetica Neue",
        color: "#000000A6",
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
}));



export default function Dashboard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const currentUser = useSelector(state => state.auth);
  const currentUserId = currentUser.id
  useEffect(() => {
    dispatch(fetchLikes(currentUserId));
  }, [dispatch, currentUserId]);
  const post = useSelector(state => state.post);
  const postlist = post.posts
  console.log(postlist)


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/");
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
      }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}

    >
      <div id="buttoncontainer">
        <ThemeProvider theme={theme}>
        <Button id="menuitem">Account</Button>
        <span id="pad">................</span>
        <Button id="menuitem" onClick={handleSubmit}>Log out</Button>
        </ThemeProvider>
      </div>
    </Menu>
  );

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

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <PersonIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className="page">

        <div className={classes.grow}>
          <AppBar id="yumblrbar" position="static">
            <Toolbar>
            <YumblrLogoSmall class="yumblrlogo"/>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search Yumblr"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                > <PersonIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="create a post"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                > <CreateIcon/>
                </IconButton>


              </div>

              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
        <BlogActionsBar/>
        {/* <div className="postsContainer"> */}
            <div id ="posts">
                {postrender()}
             </div>
        {/* </div> */}

    </div>

  </>
  );
}
