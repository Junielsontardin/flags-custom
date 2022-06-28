import React, { useEffect, useState } from "react";

import styles from "./styles.css";

export const CookiesPopUp = () => {

  const moment = require("moment");
  const [showPopup, setShowPopup] = useState(false);

  const getSeconds = () => {
    const dateNow = moment();
    const dateCloseModal = localStorage.getItem("popupDate");
    const diferenca = parseInt(moment.duration(dateNow.diff(dateCloseModal)).asSeconds());
    return diferenca;
  };

  const appearPopup = () => {
    const tempo = getSeconds();
    if (tempo >= 7200) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };

  const handleClosePopUp = () => {
    setShowPopup(false);
    const dateCloseModal = moment();
    localStorage.setItem("popupDate", dateCloseModal);
  };

  useEffect(() => {
    if (localStorage.getItem("popupDate") === null) {
      setShowPopup(true);
    } else {
      appearPopup();
    }
  }, []);

  return (
    <>
      {showPopup &&
        <div className={styles.CookiesPopUpContainer}>
          <span className={styles.CookiesPopUpTitle}>
            Ao navegar neste site, você aceita os cookies
            que usamos para melhorar sua experiência.
            <a className={styles.CookiesPopUpLink} href="/privacidade">Mais informações.</a>
          </span>
          <div
            className={styles.CookiesPopUpButton}
            onClick={() => handleClosePopUp()}
          >
            Entendi
          </div>
        </div>
      }
    </>
  );
}
