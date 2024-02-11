import React, { useState } from 'react'
import SinglePost_Comp from '../Components/New_Feeds/SinglePost_Comp'
import Nav from '../Components/Nav'
import Editor_Utils from '../Utils/Editor_Utils'
import InfiniteScroll from 'react-infinite-scroll-component'

const SinglePost = () => {
    return (
        <div>
            <Nav />
            <div className='mb-20'>
                <SinglePost_Comp />
                {/* <Editor_Utils placeholder={"Write something here..."}/> */}
            </div>
        </div>
    )
}


// const style = {
//     height: 30,
//     border: "1px solid green",
//     margin: 6,
//     padding: 8
//   };

// const SinglePost = () => {
//     const [items, setItems] = useState(Array.from({ length: 20 }));
//     const [hasMore, setHasMore] = useState(true);

//     const fetchMoreData = () => {
//         if (items.length >= 500) {
//             setHasMore(false);
//             return;
//         }

//         // a fake async api call like which sends
//         // 20 more records in .5 secs
//         setTimeout(() => {
//             setItems((prevItems) => prevItems.concat(Array.from({ length: 20 })));
//         }, 500);
//     };

//     return (
//         <div>
//             <h1>demo: react-infinite-scroll-component</h1>
//             <hr />
//             <InfiniteScroll
//                 dataLength={items.length}
//                 next={fetchMoreData}
//                 hasMore={hasMore}
//                 loader={<h4>Loading...</h4>}
//                 height={400}
//                 endMessage={
//                     <p style={{ textAlign: "center" }}>
//                         <b>Yay! You have seen it all</b>
//                     </p>
//                 }
//             >
//                 {items.map((_, index) => (
//                     <div style={style} key={index}>
//                         div - #{index}
//                     </div>
//                 ))}
//             </InfiniteScroll>
//         </div>
//     );
// }

export default SinglePost