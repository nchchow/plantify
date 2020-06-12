import React from "react";

const Card = () => {
  return (
    <article className="card">
      <img
        className="card__img"
        src="https://s3.amazonaws.com/mygardenlife.com/plant-library/full/5426_26.jpg"
        alt="plant thumbnail"
      />
      <div className="card__text overlay">
        <h4 className="card__text--title">Title</h4>
      </div>
    </article>
  );
};

export default Card;
