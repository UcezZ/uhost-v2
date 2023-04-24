import './fonts/productsans.css';
import './css/styles.css';

import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import StateContext from './context/StateContext';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LocaleService from './services/LocaleService';
import RegisterPage from './components/pages/RegisterPage';
import VideoPage from './components/pages/VideoPage';
import Header from './components/items/Header';
import ProfilePage from './components/pages/ProfilePage';
import ApiService from './services/ApiService';
import ThemeService from './services/ThemeService';
import User from './entities/User';
import Common from './Common';
import PlaylistPage from './components/pages/PlaylistPage';
import Redirect from './components/Redirect';
import AdminPage from './components/pages/AdminPage';

export default function App() {
    const [token, setToken] = useState(localStorage.getItem(Common.getTokenKey()));
    const [user, setUser] = useState();
    const [locale, setLocale] = useState();
    const [theme, setTheme] = useState();
    const [appLoaded, setAppLoaded] = useState(false);

    function onAuthSuccess(e) {
        setUser(new User(e));
        localStorage.setItem(Common.getTokenKey(), token);
    }

    function onAuthFail(e) {
        localStorage.removeItem(Common.getTokenKey());
        setUser();
    }

    // всё по токену
    useEffect(
        () => {
            if (token && !user) {
                ApiService.authenticate(token, onAuthSuccess, onAuthFail);
            } else if (!token) {
                //onAuthFail();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]);

    //всё по юзеру
    useEffect(() => {
        setLocale(new LocaleService(user));
        setTheme(new ThemeService(user));
        setAppLoaded(true);
    }, [user]);

    if (appLoaded) {
        return (
            <StateContext.Provider value={{
                token: token, setToken: setToken,
                user: user, setUser: setUser,
                locale: locale, setLocale: setLocale,
                theme: theme, setTheme: setTheme
            }}>
                <BrowserRouter basename='projects/mirea/uhost/v2'>
                    <Header />
                    {
                        user ?
                            (
                                <Routes>
                                    <Route path='*' element={<MainPage />} />
                                    <Route path='video' element={<VideoPage />} />
                                    <Route path='profile' element={<ProfilePage />} />
                                    <Route path='playlist' element={<PlaylistPage />} />
                                    <Route path='admin' element={user.isAdmin() ? <AdminPage /> : <Redirect />} />
                                </Routes>
                            ) : (
                                <Routes>
                                    <Route path='*' element={<MainPage />} />
                                    <Route path='login' element={<LoginPage />} />
                                    <Route path='register' element={<RegisterPage />} />
                                    <Route path='video' element={<VideoPage />} />
                                </Routes>
                            )
                    }
                </BrowserRouter>
            </StateContext.Provider>
        );
    }
}
