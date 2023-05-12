export const fetchComments = postId => {
  return $.ajax({
    method: 'GET',
    url: '/api/comments',
    data: {
      comment: {
        post_id: postId
      }
    }
  });
};

export const createComment = comment => {
  return $.ajax({
    method: 'POST',
    url: '/api/comments',
    data: { comment }
  });
};

export const updateComment = comment => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/comments/${comment.id}`,
    data: { comment }
  });
};

export const deleteComment = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/comments/${id}`
  });
};