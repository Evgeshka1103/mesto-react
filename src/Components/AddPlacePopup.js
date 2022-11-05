import { useState } from 'react';

import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    };

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    };

    function handleFormSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name: name,
            link: link
        });
        setName('');
        setLink('');
    };

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            button={"Создать"}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleFormSubmit}>

            <div className="popup__field">

                <input
                    type="text"
                    id="input-place"
                    className="popup__input popup__input_form-name popup__input_form-error"
                    placeholder="Название"
                    name="name"
                    minlength="2"
                    maxlength="30"
                    value={name}
                    onChange={handleNameChange}
                    required />

                <span
                    id="input-place-error"
                    className="error" />

            </div>

            <div className="popup__field">

                <input
                    type="url"
                    id="input-link"
                    className="popup__input popup__input_form-about popup__input_form-error"
                    placeholder="Ссылка на картинку"
                    name="link"
                    value={link}
                    onChange={handleLinkChange}
                    required />

                <span
                    id="input-link-error"
                    className="error" />

            </div>

        </PopupWithForm>
    )
}