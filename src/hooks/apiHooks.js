import { useEffect, useState } from 'react';

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch data');
  }
  return response.json();
};


const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const postMedia = async (fileData, inputs, token) => {
    const mediaInput = {
      title: inputs.title,
      description: inputs.description,
      filename: fileData.filename,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(mediaInput),
    };
    const response = await fetch(import.meta.env.VITE_API_URL + '/media', options);
    const json = await response.json();
    return json;
  };

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      const mediaWithUsers = await Promise.all(
        mediaData.map(async (item) => {
          try {
            const userData = await fetchData(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id
            );
            return { ...item, username: userData.username };
          } catch (err) {
            return { ...item, username: 'Unknown' }; // fallback
          }
        })
      );

      setMediaArray(mediaWithUsers);
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray, postMedia };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', options);
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async () => {
    const token = localStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token },
    };
    return await fetchData(import.meta.env.VITE_AUTH_API + '/users/token', options);
  };

  const postUser = async (inputs) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    };
    return await fetchData(import.meta.env.VITE_AUTH_API + '/users', options);
  };

  return { getUserByToken, postUser };
};

const postFile = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);
  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
  };
  const response = await fetch(`${import.meta.env.VITE_UPLOAD_SERVER}/upload`, options);
  const json = await response.json();
  return json;
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };

    const response = await fetch(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      options
    );
    const json = await response.json();
    return json;
  };

  return { postFile };
};


export { useMedia, useAuthentication, useUser, postFile, useFile };
