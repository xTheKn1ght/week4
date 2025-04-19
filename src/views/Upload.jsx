import { useState } from 'react';
import useForm from '../hooks/formHooks';
import { useFile, useMedia } from '../hooks/apiHooks';
import { useNavigate } from 'react-router';

const Upload = () => {
  const [file, setFile] = useState(null);
  const { inputs, handleInputChange } = useForm();
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await doUpload();
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      const fileData = await postFile(file, token);
      console.log('File uploaded:', fileData);
      const mediaData = await postMedia(fileData, inputs, token);
      console.log('Media uploaded:', mediaData);
      navigate('/');
    } catch (e) {
      console.log('Upload failed:', e.message);
    }
  };

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input name="title" id="title" onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={5}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            type="file"
            name="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={!file || inputs.title.length < 4}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
