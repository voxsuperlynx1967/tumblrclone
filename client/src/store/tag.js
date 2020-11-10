import Cookies from 'js-cookie';
export const RECEIVE_TAGS = "RECEIVE_TAGS";
export const RECEIVE_TAG = "RECEIVE_TAG";

// the below is an action creator
const receiveTags = (tags) => {
  return {
    type: RECEIVE_TAGS,
    tags,
  };
};

const receiveTag = (tag) => {
    return {
      type: RECEIVE_TAG,
      tag,
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

  export const fetchTagById = (id) => {
    return async (dispatch) => {
      const res = await fetch(`/api/tags/${id}`); // Using proxy in our package.json,
      // we're able to set the path to simply '/tweets'
      const data = await res.json();
      console.log(data)
      dispatch(receiveTag(data.tag));
    };
  };

  export default function tagReducer (state={}, action) {
    switch(action.type) {
      case RECEIVE_TAGS:
        debugger
        return action.tags;
    case RECEIVE_TAG:
        debugger
        return action.tag;
      default:
        return state;
    }
  }
