import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { GetTrends } from "../redux/actions/post.actions";

function Trends() {

    const allPosts = useSelector((state) => state.allPosts);
    const usersData = useSelector((state) => state.users.users.users);
    const dispatch = useDispatch();
    const trendingList = useSelector((state) => state.trending)

    useEffect(() => {//une fonction appelée à chaque fois que le composant actuel (trends) est utilisée/rechargée dans l'application
        if (allPosts[0]) {
            const postsArr = Object.keys(allPosts).map((i) => allPosts[i]);//Un tableau de chaînes de caractères qui sont les noms des propriétés énumérables de l'objet passé en argument. 
            let sortedArray = postsArr.sort((a, b) => {
                return b.likers.length - a.likers.length;
            })

            sortedArray.length = 3;
            dispatch(GetTrends(sortedArray))
        }

        // const object1 = {
        //     a: 'somestring',
        //     b: 42,
        //     c: false
        //   };
          
        //   console.log(Object.keys(object1));
        //   // Expected output: Array ["a", "b", "c"]

    }, [allPosts, dispatch])

    return (
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink to="/decouvrir">
                <ul>
                    {trendingList.length && trendingList.map((post) => {
                        return(
                            <li key={post._id}>
                                <div>
                                    {post.picture && <img src={post.picture} alt="post-pic"></img>}
                                    {post.video && (
                                        <iframe src={post.video} title={post._id} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullscreen></iframe>
                                    )}
                                    {post.picture === null && post.video === null && (
                                        <>
                                        {usersData[0] && usersData.map((user) => {
                                            if (user._id === post.posterId) {
                                                return (
                                                    <img src={user.picture} alt="profile-pic"></img>
                                                )
                                            } else return null
                                        })}
                                        </>
                                    )}
                                </div>
                                <div className="trend-content">
                                    <p>{post.message}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </NavLink>
        </div>
    )
    
}

export default Trends