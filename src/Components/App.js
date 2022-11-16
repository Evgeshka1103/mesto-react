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

import { CurrentUserContext } from '../Contexts/CurrentUserContext';

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

    function handleConfirmationDeleteClick(selectedCard) {

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
            .catch(err => console.log(`Ошибка: ${err}`));
    }


    function handleUpdateAvatar(data) {
        api.patchUserAvatarData(data)
            .then(userData => setCurrentUser(userData))
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка: ${err}`));
    }


    function handleAddPlaceSubmit(data) {

        api.postUserCardData(data)
            .then(newCard => setCards([newCard, ...cards]))
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка: ${err}`));
    }


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((i) => i._id === card._id ? newCard : i));
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    };

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(state => state.filter((i) => i._id !== card._id));
            })
            .then(() => closeAllPopups())
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen

    useEffect(() => {
        function handleEsc(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            return () => {
                document.removeEventListener('keydown', handleEsc);
            }
        }
    }, [isOpen])

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, []);

    return (

        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>

                <Header />

                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardDelete={handleConfirmationDeleteClick}
                    onClickCard={handleCardClick}
                    onLikeCard={handleCardLike}
                    cards={cards}
                />

                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />



                <ImagePopup
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                    card={selectedCard}
                />

                <PopupWithConfirmation
                    isOpen={isPopupWithConfirmationOpen}
                    onClose={closeAllPopups}
                    onDeleteCard={handleCardDelete}
                    card={selectedCard}
                />

            </CurrentUserContext.Provider>
        </div>

    );
}