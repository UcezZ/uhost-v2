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
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.loggedin')}</span>
                </span>
            );
            break;
        case 2:
            event = locale.getValue('log.event.logout');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.loggedout')}</span>
                </span>
            );
            break;
        case 3:
            event = locale.getValue('log.event.videoupload');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.videouploaded')} </span>
                    {data.hasvideo ? <Link to={`/video?v=${data.video?.alias}`}>{data.video?.name}</Link> : <i>(ID: {data.video?.id})</i>}
                </span>
            );
            break;
        case 4:
            event = locale.getValue('log.event.videoedit');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.videoedited')} </span>
                    {data.hasvideo ? <Link to={`/video?v=${data.video?.alias}`}>{data.video?.name}</Link> : <i>(ID: {data.video?.id})</i>}
                </span>
            );
            break;
        case 5:
            event = locale.getValue('log.event.videodelete');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.videodeleted')} </span>
                    <i>(ID: {data.video?.id})</i>
                </span>
            );
            break;
        case 6:
            event = locale.getValue('log.event.userregister');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.registered')}</span>
                </span>
            );
            break;
        case 7:
            event = locale.getValue('log.event.commentpost');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.postedcomment')} </span>
                    {data.hascomment ? <i>"{data.comment?.text}"</i> : <i>(ID: {data.comment?.id})</i>}
                    <span> {locale.getValue('log.message.commentforvideo')} </span>
                    {data.hasvideo ? <Link to={`/video?v=${data.video?.alias}#comment_${data.comment?.id}`}>{data.video?.name}</Link> : <i>(ID: {data.video?.id})</i>}
                </span>
            );
            break;
        case 8:
            event = locale.getValue('log.event.commentdelete');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.deletedcomment')} </span>
                    <i>(ID: {data.comment?.id})</i>
                    <span> {locale.getValue('log.message.commentforvideo')} </span>
                    {data.hasvideo ? <Link to={`/video?v=${data.video?.alias}`}>{data.video?.name}</Link> : <i>(ID: {data.video?.id})</i>}
                </span>
            );
            break;
        case 9:
            event = locale.getValue('log.event.playlistcreate');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.createdpls')} </span>
                    {data.hasplaylist ? <Link to={`/playlist?u=${data.user?.id}#playlist_${data.playlist.id}`}>{data.playlist.name}</Link> : <i>(ID: {data.playlist.id})</i>}
                </span>
            );
            break;
        case 10:
            event = locale.getValue('log.event.playlistedit');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.editedpls')} </span>
                    {data.hasplaylist ? <Link to={`/playlist?u=${data.user?.id}#playlist_${data.playlist.id}`}>{data.playlist.name}</Link> : <i>(ID: {data.playlist.id})</i>}
                </span>
            );
            break;
        case 11:
            event = locale.getValue('log.event.playlistdelete');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.deletedpls')} </span>
                    <i>(ID: {data.playlist.id})</i>
                </span>
            );
            break;
        case 12:
            event = locale.getValue('log.event.useredit');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.editedprofile')} </span>
                </span>
            );
            break;
        case 13:
            event = locale.getValue('log.event.plsentryadd');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.plsadd')} </span>
                    {data.hasplaylist ? <Link to={`/playlist?u=${data.user?.id}#playlist_${data.playlist.id}`}>{data.playlist.name}</Link> : <i>(ID: {data.playlist.id})</i>}
                    <span> {locale.getValue('log.message.video')} </span>
                    {data.hasvideo ? <Link to={`/video?v=${data.video?.alias}`}>{data.video?.name}</Link> : <i>(ID: {data.video?.id})</i>}
                </span>
            );
            break;
        case 14:
            event = locale.getValue('log.event.plsentryremove');
            message = (
                <span>
                    <span>{locale.getValue('admin.session.user')} </span>
                    <Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link>
                    <span> {locale.getValue('log.message.plsremove')} </span>
                    {data.hasplaylist ? <Link to={`/playlist?u=${data.user?.id}#playlist_${data.playlist.id}`}>{data.playlist.name}</Link> : <i>(ID: {data.playlist.id})</i>}
                    <span> {locale.getValue('log.message.video')} </span>
                    {data.hasvideo ? <Link to={`/video?v=${data.video?.alias}`}>{data.video?.name}</Link> : <i>(ID: {data.video?.id})</i>}
                </span>
            );
            break;
        default:
            event = message = '';
            break;
    }

    return (
        <tr>
            <td>{data.time}</td>
            <td><Link to={`/profile?id=${data.user?.id}`}>{data.user?.login}</Link></td>
            <td>{event}</td>
            <td>{message}</td>
        </tr>
    );
}