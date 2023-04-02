import './../../css/card.css';
import './../../css/form.css';
import './../../css/floating-button.css';

import { useContext, useEffect, useState } from 'react';
import StateContext from './../../context/StateContext';
import UserCard from '../items/cards/UserCard';
import { useSearchParams, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import LoadingContainer from '../items/containers/LoadingContainer';
import ErrorCard from '../items/cards/ErrorCard';

export default function ProfilePage() {
    const { token, user } = useContext(StateContext);
    const [search, setSearch] = useSearchParams();
    const [view, setView] = useState(<LoadingContainer />);
    const [needsRender, setNeedsRender] = useState(false);
    const location = useLocation();

    useEffect(() => { setNeedsRender(true) }, [location]);

    function setUser(e) {
        setView(<div className='card-wrapper'><UserCard entity={e} /></div>);
    }

    function setError(e) {
        setView(<div className='card-wrapper'><ErrorCard error={e} /></div>);
    }

    let id = search.has('id') && Number(search.get('id')) ? Number(search.get('id')) : 0;

    if (user && needsRender) {
        setNeedsRender(false);
        if (id) {
            ApiService.getUser(token, id, setUser, setError);
        } else {
            setView(<div className='card-wrapper'><UserCard entity={user} /></div>);
        }
    }

    return <div className="main">{view}</div>;
}