import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadDetailsModal = ({ uploadId, userId }) => {
  const [user, setUser] = useState(null);
  const [upload, setUpload] = useState(null);

  useEffect(() => {
    getUpload(uploadId);
    getUser(userId);
  }, [uploadId, userId]);

  const getUpload = (uploadId) => {
    axios
      .get(`/api/uploads/${uploadId}`)
      .then(({ data }) => {
        setUpload(data);
      })
      .catch((err) => console.log(err));
  };

  const getUser = (userId) => {
    axios
      .get(`/api/users/${userId}`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="upload-details container--modal">
      <h1>modal</h1>
      {upload && user && (
        <>
          <img src={upload.image_url} alt={upload.title} />
          <h4>{upload.title}</h4>
          <p>{upload.description}</p>
          <p>{user.name}</p>
        </>
      )}
    </article>
  );
};

export default UploadDetailsModal;
