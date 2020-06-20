import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Card = ({ upload }) => {
  const [isHeartHovered, setIsHeartHovered] = useState(null);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    // TODO: use logged in user id
    if (upload.liked_by.includes("1")) setIsLiked(true);
  }, [upload]);

  const handleLike = (event) => {
    event.stopPropagation();
    // TODO: use logged in user id
    axios
      .put(`/api/uploads/${upload.upload_id}/like`, { userId: "1" })
      .then(() => setIsLiked(true))
      .catch((err) => console.log(err));
  };

  return (
    <article className="card">
      <img className="card__img" src={upload.image_url} alt={upload.title} />
      <div className="card__content card__overlay">
        <Link to={`/feed/details/${upload.upload_id}`}>
          <h4 className="card__content--title">{upload.title}</h4>
        </Link>
        <i
          className={`fas fa-heart ${
            isLiked || isHeartHovered ? "colored" : ""
          }`}
          onClick={handleLike}
          onMouseOver={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
        ></i>
      </div>
    </article>
  );
};

export default Card;
