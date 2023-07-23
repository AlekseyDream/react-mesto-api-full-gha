import React from 'react';
import  CurrentUserContext  from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id || card.owner === currentUser._id;

  const buttonDeleteVisability = { visibility: isOwn ? 'visible' : 'hidden'};

  const isLiked = card.likes.some(like => like === currentUser._id || like._id === currentUser._id); 
  
  const cardLikeButtonClassName = `gallery__button-like ${isLiked && "gallery__button-like_active"}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="gallery__element">
      <div className="gallery__element-image">
        <img className="gallery__image"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
        {isOwn && (
          <button className="gallery__button-delete"
            onClick={handleDeleteClick}
            style={buttonDeleteVisability}
            type="button"
          />
        )}
      </div>
      <div className="gallery__info">
        <p className="gallery__title">{card.name}</p>
        <div className="gallery__like-container">
          <button
            className={cardLikeButtonClassName}
            name="addLike"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="gallery__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;