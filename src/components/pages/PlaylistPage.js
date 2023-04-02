import './../../css/loading-spinner.css';

import { useState } from "react";
import LoadingContainer from "../items/containers/LoadingContainer";

export default function PlaylistPage() {
    const [view, setView] = useState(<LoadingContainer />);

    return <div className="main">{view}</div>;
}