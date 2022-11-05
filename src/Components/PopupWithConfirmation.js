import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirmation(props) {
    function handleCardDelete(evt) {
        evt.preventDefault();
        
        props.onDeleteCard(props.card);
    };

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="confirmation"
            title="Вы уверены?"
            button="Да"
            onSubmit={handleCardDelete}
        />
    )
}