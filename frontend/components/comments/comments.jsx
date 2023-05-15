import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as commentActionCreators from '../../actions/comment_actions';

function Comments({ comments, postId, currentUserId }) {

  const [content, setContent] = useState("");
  const [myComments, setMyComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(comments.length);
  const dispatch = useDispatch();
  const { createComment } = bindActionCreators(commentActionCreators, dispatch);

useEffect(() => {
  if (commentsCount < comments.length) {
    setCommentsCount(comments.length);
  };
}, [comments.length]);

  const updateCommentContent = commentContent => {
    if (commentContent.length < 2200) {
      setContent(commentContent);
    };
  };

  const postComment = () => {
    if (content.length <= 2200) {
      const comment = { post_id: postId, user_id: currentUserId, content }
      createComment(comment)
      .then(newComment => {
        setContent('');
        setMyComments(myComments.concat(newComment.data));
        setCommentsCount(commentsCount + 1);
      });
    };
  };

  return (
    <div className="comments-container">
      {comments.length > 0 ? (
        <div className="view-all-comments-container">
          <div className="view-all-comments-button"
            onClick={() => {}}>
            {comments.length === 1 ?
              `View ${commentsCount} comment` :
              `View all ${commentsCount} comments`
            }
          </div>
        </div> ) : null}
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