import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const inputRef = useRef(null);

  function handleSumbit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      buttonText="Сохранить"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSumbit}
    >
      <input
      ref={inputRef}
      type="url"
      id="avatar-input"
      name="avatar"
      className="popup__form-input popup__form-input_data_avatar"
      placeholder="Ссылка на картинку"
      required
      />
     <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;