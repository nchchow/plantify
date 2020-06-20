import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import DetailsModal from "./DetailsModal";

const Catalog = () => {
  const [uploads, setUploads] = useState([]);
  const [pages, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
      <Route path="/details/:upload_id" component={DetailsModal} />
    </ul>
  );
};

export default Catalog;
