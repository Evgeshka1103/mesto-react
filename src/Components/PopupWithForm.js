import React from 'react';

export default function PopupWithForm(props) {

    return (
        <div className={`popup popup_${props.name} ${props.isOpen}`}>
            <div className="popup__container">
                <button
                    className="popup__button-close"
                    name="close"
                    type="button"
                    onClick={props.onClose} />
                <h3 className="popup__edit-text">{props.title}</h3>
                <form
                    className="popup__form"
                    name={`${props.name}-form`}
                    onSubmit={props.onSubmit}
                    noValidate>

                    {props.children}
                    
                    <button
                        className="popup__button"
                        type="submit" >{props.button}</button>
                </form>
            </div>
        </div>
    );
}