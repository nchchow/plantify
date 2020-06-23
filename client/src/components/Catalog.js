import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import DetailsModal from "./DetailsModal";
import MatchedModal from "./MatchedModal";

const Catalog = () => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    populateCatalog();
  }, []);

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
            <Card upload={upload} launchMatchedModal={setIsModalVisible} />
          </li>
        ))
      )}
      {isModalVisible && (
        <MatchedModal closeHandler={() => setIsModalVisible(false)} />
      )}
      <Route path="/feed/details/:upload_id" component={DetailsModal} />
    </ul>
  );
};

export default Catalog;
