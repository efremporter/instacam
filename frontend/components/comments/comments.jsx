import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as commentActionCreators from '../../actions/comment_actions';

function Comments({ postId, currentUserId }) {

  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { createComment } = bindActionCreators(commentActionCreators, dispatch);

  const updateCommentContent = commentContent => {
    if (commentContent.length < 2200) {
      setContent(commentContent);
    };
  };

  const postComment = () => {
    if (content.length <= 2200) {
      const comment = { post_id: postId, user_id: currentUserId, content }
      createComment(comment)
      .then(() => setContent(''));
    };
  };

  return (
    <div>
      <div className="add-a-comment-container">
        <textarea className="add-a-comment-textarea"
          placeholder="Add a comment..."
          value={content}
          onChange={e => updateCommentContent(e.target.value)}
        />
        <div className="add-a-comment-post-button"
          onClick={postComment}
        >Post</div>
      </div>
    </div>
  )
};

export default Comments;