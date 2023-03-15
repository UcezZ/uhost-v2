import StateContext from "../../context/StateContext";
import { useContext, useState } from "react";
import Header from "../items/Header";

export default function VideoPage() {
    const { locale, setLocale } = useContext(StateContext);
    const { user, setUser } = useContext(StateContext);
    const searchParams = window.location.searchParams;
    //const { searchParams, setSearchParams } = useContext(StateContext);
    //const [videoList, setVideoList] = useState(new LocaleService(null));

    console.log(searchParams);

    return (
        <div>
            <h1>zalupa</h1>
        </div>);
}