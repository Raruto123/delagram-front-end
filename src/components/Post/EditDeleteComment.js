import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { DeleteComment, EditComment } from "../../redux/actions/post.actions";
import { UidContext } from "../AppContext";

function EditDeleteComment({comment, postId}) {

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(EditComment(postId, comment._id, text));
            setText("");
            setEdit(false);
        }
    }

    const handleDelete = () => {
        dispatch(DeleteComment(postId, comment._id))
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true);
            }
        }
        checkAuthor();
        }, [uid, comment.commenterId]);

    return(
        <div className="edit-comment">
            {isAuthor && edit === false &&(
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/pen-to-square-solid.svg" alt="edit-comment"></img>
                </span>
            )}
            {isAuthor && edit &&(
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <label htmlFor ="text" onClick={() => setEdit(!edit)}>Editer votre message</label>
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text}></input>
                    <div className="btn-comment">
                        <span onClick={() => {
                            if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                            handleDelete();
                            }}}> 
                            <img src="./img/icons/trash-solid.svg" alt="supprimer le commentaire"></img>
                        </span>
                    </div>
                    <input type="submit" value="Valider modification"></input>
                </form>
            )}
        </div>
    )
}

export default EditDeleteComment