import Cookies from 'js-cookie';
export const RECEIVE_TAGS = "RECEIVE_TAGS";

// the below is an action creator
const receiveTags = (tags) => {
  return {
    type: RECEIVE_TAGS,
    tags,
  };
};


export const fetchTags = () => {
    return async (dispatch) => {
      const res = await fetch(`/api/tags`); // Using proxy in our package.json,
      // we're able to set the path to simply '/tweets'
      const data = await res.json();
      console.log(data)
      dispatch(receiveTags(data.tags));
    };
  };

  export default function tagReducer (state={}, action) {
    switch(action.type) {
      case RECEIVE_TAGS:
        debugger
        return action.tags;
      default:
        return state;
    }
  }
