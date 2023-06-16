import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as commentActionCreators from '../../actions/comment_actions';
import * as modalActionCreators from '../../actions/modal_actions';

function FeedComments({ postId, isProfile, currentUserId }) {
  const dispatch = useDispatch();
  const commentObj = useSelector(state => state.entities.comments);
  const comments = Object.values(commentObj);
  const [content, setContent] = useState("");
  const [myComments, setMyComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const currentUser = useSelector(state => state.entities.users[currentUserId]);
  const { createComment } = bindActionCreators(commentActionCreators, dispatch);
  const { openModal } = bindActionCreators(modalActionCreators, dispatch);

  useEffect(() => {
    let count = 0;
    comments.forEach(comment => {
      if (comment.postId === postId) count++;
    });
    setCommentsCount(count);
  }, [comments.length]);

useEffect(() => {
  if (isProfile) {
    let myCommentsSetup = [];
    let i = commentsCount - 1;
    let count = 0;
    while (count <= 1 && i > 0) {
      if (comments[i] && comments[i].userId === currentUserId) {
        myCommentsSetup.unshift(comments[i]);
        count++;
      };
      i--;
    };
    setMyComments(myCommentsSetup);
  } else {
    setAllComments(comments.slice());
  }
}, [commentsCount])

  const updateCommentContent = commentContent => {
    if (commentContent.length < 2200) {
      setContent(commentContent);
    };
  };

  const postComment = () => {
    if (!content.trim().length) return;
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

  const handleViewAllCommentsClick = () => {
    const modal = {
      postId: postId,
      isProfile: false,
      type: "postShow",
      from: "feed"
    };
    openModal(modal);
  };

  const checkForContent = () => {
    if (!content.trim().length) return 'add-comment-content-empty';
    return null;
  };

  return (
    <div className="comments-container">
      {isProfile === false && commentsCount > 0 ? (
        <div className="view-all-comments-container">
          <div className="view-all-comments-button"
            onClick={handleViewAllCommentsClick}>
            {commentsCount === 1 ?
              `View ${commentsCount} comment` :
              `View all ${commentsCount} comments`
            }
          </div>
        </div> ) : null}
        {isProfile === false && myComments.length > 0 ? (
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
        {isProfile && allComments.length > 0 ? (
          <ul className="my-comments-container">
            {allComments.map(comment => {
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
        <textarea id="post-comment-textarea" className="add-a-comment-textarea"
          placeholder="Add a comment..."
          value={content}
          type="submit"
          onChange={e => updateCommentContent(e.target.value)}
        />
        <div id={checkForContent()} className="add-a-comment-post-button"
          onClick={postComment}
        >Post</div>
      </div>
    </div>
  )
};

export default FeedComments;