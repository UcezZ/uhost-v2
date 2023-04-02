import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StateContext from "../../context/StateContext";

export default function ItemComment({ comment }) {
    function remove(e) {
        console.log(e.target);
        setView();
    }

    const { user } = useContext(StateContext);
    const [view, setView] = useState(
        <div className="item-comment-wrapper">
            <div className="comment-header-wrapper">
                <div className="username-wrapper">
                    <Link className="username" to={`/profile?id=${comment.getUser().getId()}`}>{comment.getUser().getName()}</Link>
                    <span className="datetime">{comment.getHumanTime()}</span>
                </div>
                {/* <?php
        if (isset(currentuser) && (((v = comment.getVideo()) && v.getUserId() == currentuser.getId()) || comment.getUserId() == currentuser.getId() || currentuser.isAdmin())) {
            print('<div id="delete' . comment.getId() . '" className="delete-wrapper">
                    <span></span>
                    <span></span>
                </div>');
        }
        } */}
            </div>
            <div className="comment-body">
                <span>{comment.getText()}</span>
            </div>
        </div>
    );

    return view;
}