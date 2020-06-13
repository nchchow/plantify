import React, { useState } from "react";

const Card = () => {
  const [isHeartColored, seHearttIsColored] = useState(null);

  return (
    <article className="card">
      <img
        className="card__img"
        src="https://s3.amazonaws.com/mygardenlife.com/plant-library/full/5426_26.jpg"
        alt="plant thumbnail"
      />
      <div className="card__content overlay">
        <h4 className="card__content--title">Rubber Fig</h4>
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
