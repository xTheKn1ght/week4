import {useLocation, useNavigate} from 'react-router-dom';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  if (!item) return <p>No item selected.</p>;

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls width="640">
          <source src={item.filename} type={item.media_type} />
          Your browser does not support the video tag.
        </video>
      )}
      <p>Type: {item.media_type}</p>
      <p>Size: {item.filesize} bytes</p>
      <p>Created: {new Date(item.created_at).toLocaleDateString('fi-FI')}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;
