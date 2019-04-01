import { STORY_SET_CAPTION, STORY_SET_NEW_CAPTION, STORY_SET_SELECTION_TYPE } from '../actionTypes';

const initialState = {
  caption: '',
  filename: '',
  selectionType: 'Short Click',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORY_SET_NEW_CAPTION:
      return {
        ...state,
        caption: action.caption,
        filename: action.filename,
      };
    case STORY_SET_CAPTION:
      return {
        ...state,
        caption: action.caption,
      };
    case STORY_SET_SELECTION_TYPE:
      return {
        ...state,
        selectionType: action.selectionType,
      };
    default:
      return state;
  }
};
export default reducer;
