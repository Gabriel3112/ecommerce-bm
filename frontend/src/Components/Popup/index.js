import React from "react";
import { useSpring, useTransition, animated } from "react-spring";
import { FaCheck } from "react-icons/fa";
import "./style.css";

export default function PopupComponent({ show, buttonClick, children }) {
  const TopDownProps = useSpring({
    marginTop: show ? 0 : -500,
    marginBottom: show ? 0 : 500,
  });

  const ShowingProps = useTransition(show, null, {
    from: { opacity: 0, display: "none" },
    enter: { display: "flex", opacity: 1 },
    leave: () => async (next) => {
      await next({ opacity: 0 });
      await next({ display: "none" });
    },
  });

  return (
    <div>
      {ShowingProps.map(
        ({ item, key, props }) =>
          item && (
            <animated.div style={props} className="Popup-Container">
              <animated.div style={TopDownProps} className="Popup-Info">
                <div className="Popup-Description">
                  <span>{children}</span>
                </div>
                <div
                  aria-hidden="true"
                  onClick={buttonClick}
                  type="button"
                  className="Popup-Button"
                >
                  <FaCheck color="#fff" size="1.5vw" />
                </div>
              </animated.div>
            </animated.div>
          )
      )}
    </div>
  );
}
