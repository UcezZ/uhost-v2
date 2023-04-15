
import './../../css/card.css';
import './../../css/form.css';
import './../../css/card-state.css';
import './../../css/toggle.css';
import './../../css/form-delete.css';
import './../../css/playlist.css';

import { useContext, useState } from "react";
import LoadingContainer from "../items/containers/LoadingContainer";
import StateContext from '../../context/StateContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PlaylistPage() {
    const { user, appLoaded } = useContext(StateContext);
    const [view, setView] = useState(<LoadingContainer />);
    const navigate = useNavigate();

    if (appLoaded && !user) {
        console.log([appLoaded, user, appLoaded && !user]);
        navigate('/');
    }

    return <div className="main">{view}</div>;
}