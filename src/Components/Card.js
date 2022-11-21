export default function Card(props) {
    const isOwn = props.card.owner._id === props.id;
    const buttonDeleteCardClassName = (`elements__delete ${isOwn ? 'elements__delete_active' : 'elements__delete_hidden'}`);

    const isLiked = props.card.likes.some(i => i._id === props.id);
    const buttonLikeCardClassName = (`elements__like ${isLiked ? 'elements__like_active' : 'elements__like'}`);

    function handleCardClick() {
        props.onClickCard(props.card);
    }

    function handleDeleteClick() { 
props.onCardDelete(props.card); 

    }

    function handleLikeClick() {
        props.onLikeCard(props.card);
    }

return (
        <div className="elements__card">
            <img className="elements__mask-group" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
            <div className="elements__text">
                <h2 className="elements__sight">{props.card.name}</h2>
                <div className="elements__likes-number">
                    <button className={buttonLikeCardClassName} onClick={handleLikeClick} />
                    <h4 className="elements__number-like">{props.card.likes.length}</h4>
                </div>
            </div>
            <button className={buttonDeleteCardClassName} onClick={handleDeleteClick} /> 
        </div>
    )
}





