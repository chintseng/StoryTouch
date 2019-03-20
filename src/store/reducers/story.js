import { STORY_SET_URL, STORY_SET_CAPTION } from '../actionTypes';

const initialState = {
  imageUrl: '',
  caption: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORY_SET_URL:
      return {
        ...state,
        imageUrl: action.imageUrl,
      };
    case STORY_SET_CAPTION:
      return {
        ...state,
        caption: action.caption,
      };
    default:
      return state;
  }
};
export default reducer;
