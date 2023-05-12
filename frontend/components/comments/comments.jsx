import React from "react";

function Comments() {

  return (
    <div>
      <div className="add-a-comment-container">

        <textarea className="add-a-comment-textarea"
          placeholder="Add a comment..."
        />
        <div className="add-a-comment-post-button">Post</div>
      </div>
    </div>
  )
};

export default Comments;