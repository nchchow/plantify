import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content container--fluid">
        <h1 className="hero__content--heading">
          Diversify your <span className="highlight">plant</span> collection by
          <span className="highlight"> swapping</span> with others
        </h1>
        <p className="hero__content--paragraph">
          <i className={"fas fa-heart"}></i> the plants you want, if they{" "}
          <i className={"fas fa-heart"}></i> yours back, we'll match you
        </p>
      </div>
    </section>
  );
};

export default Hero;
