import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../contexts/useForm";

const AddPlacePopup = (props) => {
  const { values, handleChange, setValues } = useForm({});

  function handleSumbit(evt) {
    evt.preventDefault();
    props.onAddPlace(values);
  }

  useEffect(() => {
    if (!props.isOpen) setValues({});
  }, [props.isOpen, setValues]);
  
  return (
    <PopupWithForm
    name="card-add"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSumbit}
    >
      <input
          type="text"
          id="title-input"
          name="name"
          className="popup__form-input popup__form-input_data_title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        onChange={handleChange}
        value={values.name || ""}

      />
       <span className="popup__input-error title-input-error"></span>

      <input
        type="url"
        id="link-input"
        name="link"
        className="popup__form-input popup__form-input_data_link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.link || ""}
      />
       <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;