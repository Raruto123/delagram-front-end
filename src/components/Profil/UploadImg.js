import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadPicture } from "../../redux/actions/user.actions";

function UploadImg() {

    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user)
    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file);

        dispatch(UploadPicture(data, userData._id));
    }

    return(
        <div>
            <form action="" onSubmit={handlePicture} className="upload-pic">
                <label htmlFor="file">Modifier la photo de profil</label>
                <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])}></input>
                <input type="submit" value="Envoyer"></input>
            </form>
        </div>
    )
    
}

export default UploadImg