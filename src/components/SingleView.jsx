const SingleView = ({item, setSelectedItem}) => {
  if (!item) return null;

  const handleClose = () => setSelectedItem(null);

  return (
    <dialog open className="single-view">
      <h2>{item.title}</h2>
      <p>{item.description || 'No description provided.'}</p>
      {item.media_type.startsWith('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : item.media_type.startsWith('video') ? (
        <video controls>
          <source src={item.filename} type={item.media_type} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Unsupported media type</p>
      )}
      <button onClick={handleClose}>Close</button>
    </dialog>
  );
};

export default SingleView;
