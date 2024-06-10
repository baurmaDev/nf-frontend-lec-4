import React, { useState } from 'react';
import {axiosInstance} from '../../api/apiClient';
import './FileUploader.css';

function FileUploader() {
    const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const uploadFile = (event) => {
    const file = event.target.files[0];
    setFile(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);

    axiosInstance.post('files/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const loaded = progressEvent.loaded;
        const total = progressEvent.total;
        setLoadedBytes(loaded);
        setTotalBytes(total);
        const percent = (loaded / total) * 100;
        setUploadProgress(Math.round(percent));
        setStatus(Math.round(percent) + "% uploaded...");
      }
    })
    .then((response) => {
      setStatus("Upload successful!");
      setUploadProgress(100);
      console.log(response.data);
    })
    .catch((error) => {
      setStatus("Upload failed!");
      console.error(error);
    });
  };

  return (
    <div className="file-uploader-container">
      <input type="file" name="file" onChange={uploadFile} />
      <label>
        File progress: <progress value={uploadProgress} max="100" />
      </label>
      <p>{status}</p>
      <p>uploaded {loadedBytes} bytes of {totalBytes}</p>
      {file && <img src={file} alt="Preview" style={{ width: "300px", height: "100px" }} />}
    </div>
  );
}

export default FileUploader;
