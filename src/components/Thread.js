// import { useEffect, useState } from "react";
// import Card from "./Post/Card";
// import { useDispatch, useSelector } from "react-redux";
// import { GetPosts } from "../redux/actions/post.actions";

// function Thread() {
// const [loadPost, setLoadPost] = useState(true);
// const dispatch = useDispatch();
// const postsData = useSelector((state) => state.posts);

// useEffect(() => {
//     if (loadPost) {
//         dispatch(GetPosts());
//         setLoadPost(false);
//     }
// }, [loadPost, dispatch])
//     return(
//         <div className="thread-container">
//             <ul>
//                 {postsData.posts.map((post) => {
//                     return(
//                         <Card post={post} key={post._id}></Card>
//                     )
//                 })}
//             </ul>
//         </div>
//     )
    
// }

// export default Thread;

import { useEffect, useState } from "react";
import Card from "./Post/Card";
import { useDispatch, useSelector } from "react-redux";
import { GetPosts } from "../redux/actions/post.actions";

function Thread() {
  const [count, setCount] = useState(5);
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.posts);



    const LoadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    } 
    useEffect(() => {
        if (loadPost) {
            dispatch(GetPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }
        window.addEventListener("scroll", LoadMore);
        return () => window.removeEventListener("scroll", LoadMore)
    }, [loadPost, dispatch, count])


  return (
    <div className="thread-container">
      <ul>
        {Array.isArray(postsData.posts) &&
          postsData.posts.map((post) => (
            <Card post={post} key={post._id}></Card>
          ))}
      </ul>
    </div>
  );
}

export default Thread;
