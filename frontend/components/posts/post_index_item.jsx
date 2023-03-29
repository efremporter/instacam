import React from "react";

function PostIndexItem(props) {


  return (
    <img className="post-index-item" src={props.post.imageUrls[0]}/>
  );
};

export default PostIndexItem;