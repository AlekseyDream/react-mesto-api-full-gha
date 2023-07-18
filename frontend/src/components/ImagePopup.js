 function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup_data_image-add popup ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_data_image">
      <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : "#"}
          alt={card ? card.name : ""}
          className="popup__image"
        />
        <p className="popup__caption">{card ? card.name : ""}</p>
        
      </div>
    </div>
  );
}

export default ImagePopup;