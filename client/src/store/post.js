import Cookies from 'js-cookie';
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const NEW_POST = "NEW_POST";

// the below is an action creator
const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
};

const newPost = (post) => {
  return {
    type: NEW_POST,
    post
  };
};

export const fetchPosts = () => {
  return async (dispatch) => {
    const res = await fetch(`/api/posts`); // Using proxy in our package.json,
    // we're able to set the path to simply '/tweets'
    const data = await res.json();
    console.log(data)
    dispatch(receivePosts(data));
  };
};

export const createPost = ( postType, userId, title, text, mediaLink, caption, reblogUserId, tagList ) => {
  return async (dispatch) => {
    debugger
    const res = await fetch(`/api/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
      },
      body: JSON.stringify({ postType, userId, title, text, mediaLink, caption, reblogUserId, tagList  })
    });


    const data = await res.json();
    console.log(data)
    dispatch(newPost(data.post));
    res.data = data;
    return res;
  };
};

export default function postReducer (state={}, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      debugger
      return action.posts;
    case NEW_POST:
      return action.post;
    default:
      return state;
  }
}
