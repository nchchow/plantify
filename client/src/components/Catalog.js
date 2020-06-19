import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Catalog = () => {
  const [uploads, setUploads] = useState([]);
  const [pages, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/uploads`)
      .then(({ data }) => {
        setUploads(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [pages]);

  return (
    <ul className="catalog container--fluid">
      {isLoading ? (
        <h1>...loading</h1>
      ) : (
        uploads.map((upload) => (
          <li key={upload.upload_id} className="catalog__item">
            <Card upload={upload} />
          </li>
        ))
      )}
    </ul>
  );
};

export default Catalog;
