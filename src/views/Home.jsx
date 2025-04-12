import React, { useState, useEffect } from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import '../App.css';
import '../index.css';

const Home = () => {
  // Initialize state with an empty array
  const [mediaArray, setMediaArray] = useState([]);

  // Function to fetch the media data from the JSON file
  const getMedia = async () => {
    try {
      const response = await fetch('test.json'); // Fetch the JSON file
      const json = await response.json(); // Parse the JSON data
      setMediaArray(json); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching media:', error); // Log errors if any
    }
  };

  // Call getMedia once after the first render
  useEffect(() => {
    getMedia();
  }, []); // Empty dependency array ensures the effect runs only once

  console.log(mediaArray); // Log the mediaArray to the console

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
          </tr>
        </thead>
        <tbody>
          {/* Iterate over mediaArray to render each media item */}
          {mediaArray.map((item) => (
            <tr key={item.media_id}>
              <td>
                <img src={item.thumbnail} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>{item.filesize}</td>
              <td>{item.media_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
