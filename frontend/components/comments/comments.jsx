import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as commentActionCreators from '../../actions/comment_actions';

function Comments({ comments, postId, currentUserId }) {

  const [content, setContent] = useState("");
  const [myComments, setMyComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const currentUser = useSelector(state => state.entities.users[currentUserId]);
  const dispatch = useDispatch();
  const { createComment } = bindActionCreators(commentActionCreators, dispatch);

useEffect(() => {
  if (commentsCount < comments.length) {
    setCommentsCount(comments.length);
  };
}, [comments.length]);

useEffect(() => {
  let myCommentsSetup = [];
  let i = commentsCount - 1;
  // console.log(comments.length, commentsCount)
  let count = 0;
  while (count <= 1 && i > 0) {
    if (comments[i] && comments[i].userId === currentUserId) {
      myCommentsSetup.push(comments[i]);
    };
    count++;
    i--;
  };
  setMyComments(myCommentsSetup);
}, [commentsCount])

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
        setMyComments(myComments.concat(Object.values(newComment.data)[0]));
        setCommentsCount(commentsCount + 1);
      });
    };
  };
  // console.log(myComments)
  return (
    <div className="comments-container">
      {commentsCount > 0 ? (
        <div className="view-all-comments-container">
          <div className="view-all-comments-button"
            onClick={() => {}}>
            {commentsCount === 1 ?
              `View ${commentsCount} comment` :
              `View all ${commentsCount} comments`
            }
          </div>
        </div> ) : null}
        {myComments.length > 0 ? (
          <ul className="my-comments-container">
            {myComments.map(comment => {
              return <li className="my-comment-li" key={comment.id}>
                <span id="comment-handle" className="feed-post-index-item-handle">
                  {currentUser.handle}
                </span>
                <span id="comment-content" className="feed-post-index-item-caption">
                  {comment.content}
                </span>
              </li>
            })}
          </ul>
        ) : null}
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