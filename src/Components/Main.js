import React from 'react';
import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../Context/CurrentUserContext';


export default function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__user">
                    <div className="profile__avatar-border">
                        <button className="profile__avatar-edit" onClick={props.onEditAvatar} />
                        <img className="profile__avatar" src={currentUser.avatar} />
                    </div>

                    <div className="profile__info">
                        <h1 className="profile__info-name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile} title="Редактировать" />
                        <p className="profile__info-about">{currentUser.about}</p>
                    </div>
                </div>

                <button type="button" className="profile__button" onClick={props.onAddPlace} title="Добавить" />
            </section>

            <section className="elements">
                {props.cards.map((data) => {
                    return <Card
                        key={data._id}
                        card={data}
                        id={currentUser._id}
                        onClickCard={props.onClickCard}
                        onLikeCard={props.onLikeCard}
                        onDeleteCard={props.onDeleteCard}
                    />
                })
                }
            </section>

        </main>
    )
}
