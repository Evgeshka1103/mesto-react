import { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../Context/CurrentUserContext";

export default function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleFormSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            button={"Сохранить"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleFormSubmit}>

            <div className="popup__field">
                <input
                    type="text"
                    id="input-name"
                    className="popup__input popup__input_form-name popup__input_form-error"
                    placeholder="Имя"
                    value={name || ''}
                    name="name"
                    minLength="2"
                    maxLength="40"
                    onChange={handleNameChange}
                    required />

                <span
                    id="input-name-error"
                    className="error" />

            </div>

            <div className="popup__field">
                <input
                    type="text"
                    id='input-about'
                    className="popup__input popup__input_form-about popup__input_form-error"
                    placeholder="О себе"
                    value={description || ''}
                    name="about"
                    minLength="2"
                    maxLength="200"
                    onChange={handleDescriptionChange}
                    required />

                <span
                    id="input-about-error"
                    className="error" />

            </div>
        </PopupWithForm>
    )
}