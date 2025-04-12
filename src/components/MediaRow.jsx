import {Link} from 'react-router-dom';

const MediaRow = ({item}) => {
  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} width="100" />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleDateString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <Link to="/single" state={{item}}>Show</Link>
      </td>
    </tr>
  );
};

export default MediaRow;
