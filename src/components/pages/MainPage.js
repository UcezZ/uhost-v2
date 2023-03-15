import './../../fonts/productsans.css';
import './../../css/styles.css';
import './../../css/card.css';
import './../../css/form.css';
import './../../css/form-search.css';
import './../../css/page-video.css';
import SearchBlock from '../items/SearchBlock';
import React, { useContext } from 'react';
import StateContext from '../../context/StateContext';
import Header from '../items/Header';

export default function MainPage() {
    // fuck && fuck("pizda")
    // const { user, setUser } = useContext(StateContext);

    return (
        <div>
            <SearchBlock />
            <div className="main">
            </div>
        </div>
    );
}