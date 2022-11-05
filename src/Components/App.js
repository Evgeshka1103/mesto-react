import { useState, useEffect } from 'react';
import '../App.css';
import api from '../utils/Api';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithConfirmation from './PopupWithConfirmation';

import { CurrentUserContext } from '../Context/CurrentUserContext';

export default function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardClick(selectedCard) {
        setSelectedCard(selectedCard);
        setIsImagePopupOpen(true);
    };

    function handleDeleteClick(selectedCard) {
        setSelectedCard(selectedCard);
        setIsPopupWithConfirmationOpen(true);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsPopupWithConfirmationOpen(false);

        setSelectedCard({});
    };

    function handleUpdateUser(data) {
        api.patchUserInfoData(data)
            .then(userData => setCurrentUser(userData))
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка: ${err}`))
    }


    function handleUpdateAvatar(data) {
        api.patchUserAvatarData(data)
            .then(userData => setCurrentUser(userData))
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка: ${err}`))
        }


    function handleAddPlaceSubmit(data) {
        api.postUserCardData(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(element => element._id === currentUser._id);
        api.changeLikeStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((element) => element._id === card._id ? newCard : element));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    };

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(state => state.filter((element) => element._id !== card._id));
            })
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleEsc(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    });


    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch(err => console.log(`Ошибка: ${err}`))
    }, []);

    return (

        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>

                <Header />

                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onDeleteCard={handleDeleteClick}
                    onClickCard={handleCardClick}
                    onLikeCard={handleCardLike}
                    cards={cards}
                />

                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />



                <ImagePopup
                    isOpen={isImagePopupOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    card={selectedCard}
                />

                <PopupWithConfirmation
                    isOpen={isPopupWithConfirmationOpen && 'popup__opened'}
                    onClose={closeAllPopups}
                    onSubmitDelete={handleCardDelete}
                    card={selectedCard}
                />

            </CurrentUserContext.Provider>
        </div>

    );
}