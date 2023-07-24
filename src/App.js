import Index from "./components/Routes/index.js";
import { UidContext } from "./components/AppContext.js";
import axios  from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetUser } from "./redux/actions/user.actions.js";


function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  // à chaque fois que l'application est appelé grâce au useEffect on effectue automatiquement la fonction de verification de la clé jwt
  useEffect(() => {
    const fetchToken = async() => {
      await axios({
        method : "get",
        url : `https://delagram-app-api.onrender.com/jwtid`,
        withCredentials : true
      }).then((res) => {
        console.log(res);
        setUid(res.data);
      }).catch((err) => {
        console.log("No Token");
        console.log(err)
      })
    };
    fetchToken();


  }, [setUid]);

  if (uid) {
    dispatch(GetUser(uid))
  };
  return (
    <UidContext.Provider value={uid}>
      <Index></Index>
    </UidContext.Provider>
  );
}

export default App;
