import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux"
import { DeletePost } from "../../redux/actions/post.actions";

function DeleteCard(props) {
    const dispatch = useDispatch();
    
    const DeleteQuote = () => {
        dispatch(DeletePost(props.id));
    }
    return(
    <div onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {//confirm te propose le choix de "non" ou "oui" alert t'informe juste de quelque chose
            DeleteQuote();
        }
    }}>
        <img src="./img/icons/trash-solid.svg" alt="delete"></img>
        <FontAwesomeIcon icon="fa-solid fa-delete-left"></FontAwesomeIcon>
    </div>
    
)}

export default DeleteCard