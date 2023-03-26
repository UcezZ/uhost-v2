import './../../css/card.css';
import './../../css/form.css';
import './../../css/floating-button.css';
import { useContext, useEffect, useState } from 'react';
import StateContext from './../../context/StateContext';
import CardUser from '../items/cards/UserCard';
import { useSearchParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import User from '../../entities/User';
import Common from '../../Common';

export default function ProfilePage() {
    const { token, user } = useContext(StateContext);
    const [search, setSearch] = useSearchParams();
    const [shownUser, setShownUser] = useState();

    /*useEffect(() => {
        let data = localStorage.getItem(Common.getUserLocalStorageKey());
        if (data) {
            setUser(new User(data));
        }
    }, [isLoggedIn]);*/
    //useEffect(() => { }, [shownUser]);
    let id = search.has('id') && Number(search.get('id')) ? Number(search.get('id')) : 0;
    if (id && (!user || id != user.id)) {
        ApiService.getUser(token, id, setShownUser);
    }

    //useEffect(() => { }, [user, shownUser]);
    if (user) {
        return (
            <div className='card-wrapper'>
                <CardUser entity={shownUser ?? user} />
            </div>
        );
    }
}