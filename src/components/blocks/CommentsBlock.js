import Enumerable from 'linq';
import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StateContext from '../../context/StateContext';
import ApiService from '../../services/ApiService';
import LoadingContainer from '../containers/LoadingContainer';
import ErrorDialog from '../dialogs/ErrorDialog';
import CommentItem from '../items/CommentItem';

export default function CommentsBlock({ video }) {
    const { token, user, locale } = useContext(StateContext);
    const [view, setView] = useState(<LoadingContainer />);
    const [needsRender, setNeedsRender] = useState(false);
    const [error, setError] = useState();
    const [ts, setTs] = useState();
    const location = useLocation();

    useEffect(() => {
        setNeedsRender(true);
        setTimeout(() => setTs(new Date().getTime()), 10000);
    }, [location, ts]);

    function noComments(e) {
        setView(
            <i>
                {locale.getValue('comment.nocomments')}
                {user ? <br /> : null}
                {user ? locale.getValue('comment.yourmightbefirst') : null}
            </i>
        );
    }

    function showComments(e) {
        setView(
            Enumerable
                .from(e)
                .select(c => <CommentItem key={c.getId()} comment={c} />)
        );
    }

    /**
     * 
     * @param {HTMLFormElement} form 
     */
    function commentPosted(form) {
        setNeedsRender(true);
        Enumerable
            .from(form.elements)
            .where(e => e instanceof HTMLInputElement)
            .where(e => e.name === 'text')
            .forEach(e => e.value = '');
    }

    function postComment(e) {
        e.preventDefault && e.preventDefault();

        ApiService.postComment(
            token,
            e.target,
            () => commentPosted(e.target),
            e => setError(
                <ErrorDialog error={e} onSubmit={() => setError()} />
            )
        );
    }

    if (needsRender && video) {
        setNeedsRender(false);
        ApiService.getCommentsByVideoAlias(token, video.getAlias(), showComments, noComments);
    }

    return (
        <div className="comment-wrapper content-wrapper card">
            <div className="card-header">{locale.getValue('video.comments')}</div>
            <div className="card-body">{view}</div>
            {
                user ? (
                    <form onSubmit={postComment} className="card-footer">
                        <input type="hidden" name="alias" value={video.getAlias()} />
                        <input type="text" name="text" maxLength="255" required />
                        <button type="submit">{locale.getValue('comment.send')}</button>
                    </form>
                ) : null
            }
            {error}
        </div>
    );
}