import FormData from 'form-data';

import API from './api';

const api = new API();

export const uploadImageAPI = async (image) => {
  const data = new FormData();
  data.append('image', {
    uri: image,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });
  return api.post('/app_select', data, 'multipart/form-data');
};

export const getStoryAPI = async (x, y, filename, width, height, radius = null) => {
  let endpoint;
  const data = {
    coordinates: {
      x,
      y,
    },
    img_name: filename,
    img_size: {
      width: `${width}px`,
      height: `${height}px`,
    },
  };
  if (!radius) {
    endpoint = '/app_short_click';
  } else {
    endpoint = '/app_long_click';
    data.radius = radius;
  }
  return api.post(endpoint, data);
};

export const getRecStoryAPI = async (filename, width, height, rec) => {
  const data = {
    img_name: filename,
    img_size: {
      width: `${width}px`,
      height: `${height}px`,
    },
    rectangles: {
      x_left: `${rec.left}px`,
      x_right: `${rec.right}px`,
      y_top: `${rec.top}px`,
      y_bottom: `${rec.bottom}px`,
    },
  };
  console.log(data);
  return api.post('/app_rectangle_click', data);
};

