import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Register from './Register.js';

import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from '../components/InfoTooltip';

import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRouteElement from './ProtectedRoute';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isRegister, setIsRegister] = useState({
        status: '',
        message: '',
    });

    const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getAllCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards.reverse());
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        setToken(jwt);
    }, [token]);

    useEffect(() => {
        if (!token || isLoggedIn) {
            return;
        }
        api.setAuthHeaders(token)
        api
            .getUserInfo()
            .then((res) => {
                setUserEmail({ email: res.email });
                setIsLoggedIn(true);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token, isLoggedIn, navigate]);


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
        setIsOpenInfoTooltip(false);
    }

    const registerUser = (userData) => {
        api
            .registerUser(userData)
            .then(() => {
                setIsOpenInfoTooltip(true);
                setIsRegister({
                    status: true,
                    message: 'Вы успешно зарегистрировались!',
                });
                navigate('/');
                navigate('/sign-in', { replace: true });
            })
            .catch((err) => {
                setIsOpenInfoTooltip(true);
                setIsRegister({
                    status: false,
                    message: 'Что-то пошло не так! Попробуйте ещё раз.',
                });
                console.log(err);
            });
    };

    const loginUser = (loginData) => {
        api
            .loginUser(loginData)
            .then((res) => {
                setToken(res.token);
                setUserEmail(res.email);
                localStorage.setItem('jwt', res.token);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setIsOpenInfoTooltip(true);
                setLoginError({ message: 'Что-то пошло не так! Попробуйте ещё раз.' });
            });
    };

    const logOut = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setToken('');
        setCurrentUser({});
        navigate('/sign-in');
    };


    const handleCardLike = (card) => {
        const isLiked = card.likes.some(like => like === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then(newCard =>
                setCards(state => state.map(c => c._id === card._id ? newCard : c)))
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCardDelete = (card) => {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((item) => item._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUpdateUser = (items) => {
        api
            .updateUserInfo(items)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUpdateAvatar = (item) => {
        api
            .updateUserAvatar(item)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddPlaceSubmit = (items) => {
        api
            .addNewCard(items)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <Header userEmail={userEmail} logOut={logOut} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRouteElement
                                loggedIn={isLoggedIn}
                                element={Main}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                                logOut={logOut}
                            />
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <Login
                                isloggedIn={isLoggedIn}
                                loginUser={loginUser}
                                errorMessage={loginError}
                                onClose={closeAllPopups}
                                title="Вход"
                                buttonText="Войти"
                            />
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            <Register
                                isloggedIn={isLoggedIn}
                                registerUser={registerUser}
                                onClose={closeAllPopups}
                                title={'Регистрация'}
                                buttonText={'Зарегистрироваться'}
                            />
                        }
                    />

                    <Route
                        path="/*"
                        element={
                            isLoggedIn ? (
                                <Navigate
                                    to="/"
                                    replace
                                />
                            ) : (
                                <Navigate
                                    to="/sign-in"
                                    replace
                                />
                            )
                        }
                    />
                </Routes>
                {isLoggedIn && <Footer />}

                <InfoTooltip
                    isRegister={isRegister}
                    isOpen={isOpenInfoTooltip}
                    onClose={closeAllPopups}
                    alt={'Статус'}
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

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <PopupWithForm
                    name="delete"
                    title="Вы уверены?"
                    buttonText="Да"
                    onClose={closeAllPopups}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;