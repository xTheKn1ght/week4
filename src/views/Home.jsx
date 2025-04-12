import React, { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import '../App.css';
import '../index.css';

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  // Fetch media data
  const getMedia = async () => {
    try {
      const mediaData = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
      // Fetch user data for each media item
      const mediaWithUsers = await Promise.all(
        mediaData.map(async (item) => {
          const userData = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
          return { ...item, username: userData.username };
        })
      );
      setMediaArray(mediaWithUsers);
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  };

  // Call getMedia on first render
  useEffect(() => {
    getMedia();
  }, []);

  return (
    <div>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <tr key={item.media_id}>
              <td>
                <img src={item.thumbnail} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>{item.description || 'No description available'}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>{item.filesize}</td>
              <td>{item.media_type}</td>
              <td>{item.username}</td> {/* Display username */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
