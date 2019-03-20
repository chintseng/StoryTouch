import { STORY_SET_URL, STORY_SET_CAPTION } from '../actionTypes';
import { uploadImageAPI, getStoryAPI } from '../../apis/story';

export const uploadImage = (image) => {
  return async (dispatch) => {
    const url = await uploadImageAPI(image);
    dispatch({
      type: STORY_SET_URL,
      url,
    });
  };
};

export const getStory = (x, y) => {
  return async (dispatch) => {
    const caption = await getStoryAPI(x, y);
    dispatch({
      type: STORY_SET_CAPTION,
      caption,
    });
  };
};

