import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadDetails = (matchProps) => {
  const [user, setUser] = useState(null);
  const [upload, setUpload] = useState(null);

  useEffect(() => {
    getUpload(matchProps.match.params.upload_id)
      .then((upload) => {
        setUpload(upload);
        getUser(upload.owner_id).then((user) => setUser(user));
      })
      .catch((err) => console.log(err));
  }, [matchProps.match.params.upload_id]);

  const getUpload = (uploadId) => {
    return axios
      .get(`/api/uploads/${uploadId}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err));
  };

  const getUser = (userId) => {
    return axios
      .get(`/api/users/${userId}`)
      .then(({ data }) => data)
      .catch((err) => console.log(err));
  };

  return (
    <div className="overlay">
      <article className="upload-details container--modal">
        {upload && user && (
          <>
            <img
              className="upload-details__img"
              src={upload.image_url}
              alt={upload.title}
            />
            <div className="upload-details--text-wrap">
              <h4 className="upload-details__title">{upload.title}</h4>
              <p className="upload-details__description">
                {upload.description}
              </p>
              <p className="upload-details__username">{user.name}</p>
            </div>
          </>
        )}
      </article>
    </div>
  );
};

export default UploadDetails;
