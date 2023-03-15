import './../../fonts/productsans.css';
import './../../css/styles.css';
import './../../css/card.css';
import './../../css/form.css';
import './../../css/floating-button.css';
import { useContext, useEffect } from 'react';
import StateContext from './../../context/StateContext';
import CardUser from '../items/cards/UserCard';

export default function ProfilePage() {
    const { user } = useContext(StateContext);
    //alert(user ? JSON.stringify(user) : user);

    useEffect(() => { }, [user]);
    return (
        <div className='card-wrapper'>
            <CardUser entity={user} />
        </div>
    );
}