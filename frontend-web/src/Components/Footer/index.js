import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import {
  FaArrowUp,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

import "./style.css";

function FooterComponent() {
  const [showingFooter, setShowingFooter] = useState(false);
  const [rot, setRot] = useState(0);
  const { height, display, transform } = useSpring({
    height: showingFooter ? "210px" : "1px",
    display: showingFooter ? "flex" : "none",
    transform: `rotateZ(${rot}deg)`,
  });

  function HandleShow() {
    setShowingFooter(!showingFooter);
    setRot(rot + 180);
  }

  return (
    <div className="Footer-Container">
      <div
        className="Footer-Btn-Info-Container"
        onClick={() => HandleShow()}
        role="button"
        aria-hidden="true"
      >
        <animated.div style={{ transform }}>
          <FaArrowUp />
        </animated.div>
        <p>Informações</p>
      </div>

      <animated.div
        className="Footer-Info-Container"
        style={{ display, height }}
      >
        <div className="FlagCard-Container">
          <p>Métodos de pagamento: </p>
          <img src="/images/Card-Flags.png" alt="Bandeiras" />
        </div>
        <div className="Contact-Container">
          <div className="Contact-Info-Container">
            <div className="Background-Icon-Contact">
              <FaMapMarkerAlt size="2vw" />
            </div>
            <div className="Contact-Info">
              <span>Endereço</span>
              <p>Pernambuco, Brasil</p>
            </div>
          </div>
          <div className="Contact-Info-Container">
            <div className="Background-Icon-Contact">
              <FaEnvelope size="2vw" />
            </div>
            <div className="Contact-Info">
              <a
                href="mailto: binariomimos@gmail.com"
                rel="noreferrer"
                target="_top"
              >
                binariomimos@gmail.com
              </a>
            </div>
          </div>
          <div className="Contact-Info-Container">
            <div className="Background-Icon-Contact">
              <FaPhone size="2vw" />
            </div>
            <div className="Contact-Info">
              <a href="callto:81998170526" rel="noreferrer">
                +55 81 99817 0526
              </a>
            </div>
          </div>
        </div>
        <div className="SocialMedia-Container">
          <div className="SocialMedia-Info-Container">
            <div className="Background-Icon-SocialMedia">
              <a
                href="https://www.instagram.com/binariomimos/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size="3vw" color="#000" />
              </a>
            </div>
            <div className="Background-Icon-SocialMedia">
              <a
                href="https://api.whatsapp.com/send?phone=5581998170526"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp size="3vw" color="#000" />
              </a>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

export default FooterComponent;
