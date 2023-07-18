import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";


function EditFrofilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
   
    useEffect(() => {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }, [currentUser, props.isOpen]);

    function handleSumbit(evt) {
        evt.preventDefault();
        
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    function hadleChangeName(evt) {
        setName(evt.target.value);
    }

    function hadleChangeAbout(evt) {
        setDescription(evt.target.value);
    }

    return (
        <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSumbit}
        >
            <input
                type="text"
                id="name-input"
                name="name"
                className="popup__form-input popup__form-input_data_name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={name || ""}
                onChange={hadleChangeName}
                required
            />
            <span className="popup__input-error name-input-error"></span>
            <input
                type="text"
                id="about-input"
                name="about"
                className="popup__form-input popup__form-input_data_about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                value={description || ""}
                onChange={hadleChangeAbout}
                required
            />
            <span className="popup__input-error about-input-error"></span>
        </PopupWithForm>
    );
}

export default EditFrofilePopup;