export default function ImagePopup(props) {

    return (
        <div className={`popup popup_photo-template popup_shadow ${props.isOpen}`}>

            <div className="popup__preview">

                <img
                    className="popup__image"
                    alt={props.card.name}
                    src={props.card.link} />

                <h3 className="popup__caption">{props.card.name}</h3>

                <button
                    className="popup__button-close"
                    name="close"
                    type="button"
                    onClick={props.onClose}

                />

            </div>

        </div>
    )
}