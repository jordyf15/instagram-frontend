export const requestImageUrl = (url) => {
  const originalPath = url.split('/');
  const requestPath = `http://localhost:8000/resources/${originalPath.slice(1,originalPath.length).join('/')}`;
  return requestPath;
};

export const DEFAULT_PROFILE_PICTURE_LINK = './profile_pictures/small-default-profile.jpg';