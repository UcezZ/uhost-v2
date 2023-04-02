import Enumerable from 'linq';
import { useContext, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import StateContext from '../../../context/StateContext';
import ApiService from '../../../services/ApiService';
import LoadingContainer from '../containers/LoadingContainer';
import ItemComment from '../ItemComment';

export default function CommentsBlock() {
    const { token, user, locale } = useContext(StateContext);
    const [view, setView] = useState(<LoadingContainer />);
    const [needsRender, setNeedsRender] = useState(false);
    const [search, setSearch] = useSearchParams();
    const location = useLocation();

    useState(() => { setNeedsRender(true) }, [location, user]);

    let alias = search.has('v') && search.get('v').length > 0 && search.get('v').length < 9 ? search.get('v') : null;

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
                .select(c => <ItemComment comment={c} />)
        );
    }

    if (needsRender && alias) {
        setNeedsRender(false);
        ApiService.getCommentsByVideoAlias(token, alias, showComments, noComments);
    }

    return (
        <div className="comment-wrapper content-wrapper card">
            <div className="card-header">{locale.getValue('video.comments')}</div>
            <div className="card-contents">{view}</div>
            {/* <?php
        if (isset($currentuser)) {
            print '<div className="card-footer">
            <input id="comment-input" type="text" maxlength="255">
            <input id="comment-submit" type="button" value="' . locale.getValue('comment.send') . '">
        </div>';
        }
        } */}
        </div>
    );
}