import React from "react";

function PopupWithForm({ name, isOpen, onClose, title, children, buttonText, onSubmit }) {
  return (
    <div className={`popup_data_${name} popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <p className="popup__title">{title}</p>
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          >
          {children}
          <button
            type="submit"
            className="popup__button-save"
            >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;