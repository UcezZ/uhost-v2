import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StateContext from "../../context/StateContext";
import ErrorDialog from "./dialogs/ErrorDialog";
import ApiService from "../../services/ApiService";

export default function CommentItem({ comment }) {
    const { token, user } = useContext(StateContext);
    function remove(e) {
        console.log(comment);
        ApiService.removeComment(
            token,
            comment.getId(),
            e => setView(),
            e => <ErrorDialog error={e} />
        );
    }

    function removeButton() {
        if (user && ((comment.getVideo() && comment.getVideo().getUserId() == user.getId()) || comment.getUserId() == user.getId() || user.isAdmin())) {
            return (<div onClick={remove} className="delete-wrapper">
                <span></span>
                <span></span>
            </div>);
        }
    }

    const [view, setView] = useState(
        <div className="item-comment-wrapper">
            <div className="comment-header-wrapper">
                <div className="username-wrapper">
                    <Link className="username" to={`/profile?id=${comment.getUser().getId()}`}>{comment.getUser().getName()}</Link>
                    <span className="datetime">{comment.getHumanTime()}</span>
                </div>
                {removeButton()}
            </div>
            <div className="comment-body">
                <span>{comment.getText()}</span>
            </div>
        </div>
    );

    return view;
}