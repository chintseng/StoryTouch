import { STORY_SET_CAPTION, STORY_SET_NEW_CAPTION, STORY_SET_SELECTION_TYPE } from '../actionTypes';
import { uploadImageAPI, getStoryAPI, getRecStoryAPI } from '../../apis/story';
import { uiStartLoading, uiStopLoading } from './ui';
import { STORY_CAPTIONING } from '../loadingTypes';

export const uploadImage = (image) => {
  return async (dispatch) => {
    dispatch(uiStartLoading(STORY_CAPTIONING));
    try {
      const response = await uploadImageAPI(image);
      dispatch({
        type: STORY_SET_NEW_CAPTION,
        caption: response.caption,
        filename: response.ori_imge,
      });
      await storage.save({
        key: 'history',
        id: response.filename,
        data: {
          url: response.filename,
          caption: response.caption,
        },
      });
      dispatch(uiStopLoading(STORY_CAPTIONING));
    } catch (e) {
      console.log(e);
      dispatch(uiStopLoading(STORY_CAPTIONING));
    }
  };
};

export const getStory = (x, y, width, height, additional = null) => {
  return async (dispatch, getState) => {
    dispatch(uiStartLoading(STORY_CAPTIONING));
    const { filename } = getState().story;
    try {
      let response;
      if (additional && typeof additional !== 'number') {
        response = await getRecStoryAPI(filename, width, height, additional);
      } else {
        response = await getStoryAPI(x, y, filename, width, height, additional);
      }
      await storage.save({
        key: 'history',
        id: response.filename,
        data: {
          url: response.filename,
          caption: response.caption,
        },
      });
      dispatch({
        type: STORY_SET_CAPTION,
        caption: response.caption,
      });
      dispatch(uiStopLoading(STORY_CAPTIONING));
    } catch (e) {
      console.log(e);
      dispatch(uiStopLoading(STORY_CAPTIONING));
    }
  };
};

export const setSelectionType = (type) => {
  return (dispatch) => {
    dispatch({
      type: STORY_SET_SELECTION_TYPE,
      selectionType: type,
    });
  };
};

export const getHistory = () => {
  return async () => {
    // await storage.clearMapForKey('history');
    return storage.getAllDataForKey('history');
  };
};

export const clearHistory = () => {
  return async () => {
    return storage.clearMapForKey('history');
  };
};
