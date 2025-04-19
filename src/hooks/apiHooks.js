import { useEffect, useState } from 'react';

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

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

  return { mediaArray };
};

export { useMedia };
