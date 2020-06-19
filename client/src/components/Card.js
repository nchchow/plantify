import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ upload }) => {
  const [isHeartHovered, setIsHeartHovered] = useState(null);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    // TODO: use logged in user id
    if (upload.liked_by.includes("1")) setIsLiked(true);
  }, [upload]);

  const handleLike = () => {
    // TODO: use logged in user id
    axios
      .put(`/api/uploads/${upload.upload_id}/like`, { userId: "1" })
      .then(() => setIsLiked(true))
      .catch((err) => console.log(err));
  };

  return (
    <article className="card">
      <img
        className="card__img"
        src={upload.image_url}
        alt={`photo of a ${upload.title}`}
      />
      <div className="card__content overlay">
        <h4 className="card__content--title">{upload.title}</h4>
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
