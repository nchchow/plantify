import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import UploadDetailsModal from "./UploadDetailsModal";

const Catalog = () => {
  const [uploads, setUploads] = useState([]);
  const [pages, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoadDetails, setShouldLoadDetails] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    populateCatalog();
  }, [pages]);

  const populateCatalog = () => {
    axios
      .get(`/api/uploads`)
      .then(({ data }) => {
        setUploads(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleLoadDetails = (uploadId, userId) => {
    setUploadId(uploadId);
    setUserId(userId);
    setShouldLoadDetails(true);
  };

  return (
    <ul className="catalog container--fluid">
      {isLoading ? (
        <h1>...loading</h1>
      ) : (
        uploads.map((upload) => (
          <li
            key={upload.upload_id}
            className="catalog__item"
            onClick={() => handleLoadDetails(upload.upload_id, upload.owner_id)}
          >
            <Card upload={upload} />
          </li>
        ))
      )}
      {shouldLoadDetails && (
        <UploadDetailsModal uploadId={uploadId} userId={userId} />
      )}
    </ul>
  );
};

export default Catalog;
