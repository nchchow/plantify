import React from "react";
import { useSpring, animated } from "react-spring";
import ModalCloseButton from "./ModalCloseButton";

const MatchedModal = ({ closeHandler }) => {
  const props = useSpring({
    to: { width: 180, color: "#000" },
    from: { width: 0, color: "#fff" },
  });
  return (
    <div className="overlay--light container--modal">
      <article className="matched-modal">
        <ModalCloseButton onClick={closeHandler} />
        <div className="matched-modal--text-wrapper">
          <animated.div style={props} className="matched-modal__title">
            It's a Match!
          </animated.div>
        </div>
      </article>
    </div>
  );
};

export default MatchedModal;
