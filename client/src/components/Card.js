import React, { useState } from "react";

const Card = ({ upload }) => {
  const [isHeartColored, seHearttIsColored] = useState(null);

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
          className={`fas fa-heart ${isHeartColored ? "colored" : ""}`}
          onClick={() => console.log("clicked")}
          onMouseOver={() => seHearttIsColored(true)}
          onMouseLeave={() => seHearttIsColored(false)}
        ></i>
      </div>
    </article>
  );
};

export default Card;
