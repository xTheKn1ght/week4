import { Link } from 'react-router-dom';

const MediaRow = ({ item }) => {
  return (
    // Wrap the entire row with Link to make the entire row clickable
    <Link to="/single" state={{ item }}>
      <tr key={item.media_id}>
        <td>
          <img src={item.thumbnail} alt={item.title} />
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{new Date(item.created_at).toLocaleDateString()}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
        <td>{item.username}</td> {/* Display username */}
      </tr>
    </Link>
  );
};

export default MediaRow;
