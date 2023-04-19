import { useContext } from "react";
import { Link } from "react-router-dom";
import StateContext from "../../context/StateContext";

export default function LogItem({ data }) {
    const { locale } = useContext(StateContext);
    /*
    1	Log in
    2	Log out
    3	Video uploaded
    4	Video edited
    5	Video deleted
    6	User registered
    7	Comment posted
    8	Comment deleted
    9	Playlist created
    10	Playlist edited
    11	Playlist deleted
    12	User edited
    13	Entry added
    14	Entry removed
    */
    /*
       {
         "time": "13.11.2022 16:45:47",
         "event": {
           "id": 1
         },
         "user": {
           "id": 1,
           "login": "admin"
         },
         "hasvideo": false,
         "video": null,
         "hascomment": false,
         "comment": null,
         "hasplaylist": false,
         "playlist": null
       }
    */

    let event = null;
    let message = null;

    switch (data.event.id) {
        case 1:
            event = locale.getValue('log.event.login');
            message = <span>{locale.getValue('log.message.login')}</span>;
            break;
        case 2:
            event = locale.getValue('log.event.logout');
            message = <span>{locale.getValue('log.message.logout')}</span>;
            break;
        case 3:
            event = locale.getValue('log.event.videoupload');
            message = <span>{locale.getValue('log.event.message.videoupload')} {data.hasvideo ? <Link to={`/video?v=${data.video.alias}`}>{data.video.name}</Link> : null}</span>;
            break;
        case 4:
            event = locale.getValue('log.event.videoedit');
            break;
        case 5:
            event = locale.getValue('log.event.videodelete');
            break;
        case 6:
            event = locale.getValue('log.event.userregister');
            break;
        case 7:
            event = locale.getValue('log.event.commentpost');
            break;
        case 8:
            event = locale.getValue('log.event.commentdelete');
            break;
        case 9:
            event = locale.getValue('log.event.playlistcreate');
            break;
        case 10:
            event = locale.getValue('log.event.playlistedit');
            break;
        case 11:
            event = locale.getValue('log.event.playlistdelete');
            break;
        case 12:
            event = locale.getValue('log.event.useredit');
            break;
        case 13:
            event = locale.getValue('log.event.plsentryadd');
            break;
        case 14:
            event = locale.getValue('log.event.plsentryremove');
            break;
    }

    return (
        <tr>
            <td>{data.time}</td>
            <td><Link to={`/profile?id=${data.user.id}`}>{data.user.login}</Link></td>
            <td>{event}</td>
        </tr>
    );
}