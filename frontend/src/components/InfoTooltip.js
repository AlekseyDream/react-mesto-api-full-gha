import React from "react";
import infoToltipSuccess from "../images/Union-Success.svg";
import infoToltipFail from "../images/Union-Fail.svg";
import { usePopupClose } from "../contexts/usePopupClose";

const InfoTooltip = ({ onClose, isOpen, isRegister }) => {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup_data_tooltip">
        <button
          className="popup__button-close"
          onClick={onClose}
          id="popup-profileClose"
          type="button"
        ></button>
        <img
          className="popup__image-status"
          src={isRegister.status ? infoToltipSuccess : infoToltipFail}
          alt="Статус"
        ></img>
        <p className="popup__text-status">{isRegister.message}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;