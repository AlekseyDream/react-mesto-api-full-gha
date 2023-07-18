import React, { useContext } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete, }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__button-edit"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка"
          />
        </button>
        <div className="profile__content">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button"
              onClick={onEditProfile}
            ></button>
          </div>
          <h2 className="profile__description">{currentUser.about}</h2>
        </div>
        <button
          type="button"
          className="profile__button-addCard hover"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;