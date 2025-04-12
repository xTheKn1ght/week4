import { useLocation } from 'react-router-dom';

const SingleView = () => {
  const { state } = useLocation(); // Get the state passed from the Link component
  const item = state.item; // Access the media item

  return (
    <div>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p><strong>Owner:</strong> {item.username}</p>

      {/* Conditionally render based on media type */}
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : item.media_type.startsWith('video') ? (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      ) : null}

      {/* Add a back button to return to the previous page */}
      <button onClick={() => window.history.back()}>Go back</button>
    </div>
  );
};

export default SingleView;
